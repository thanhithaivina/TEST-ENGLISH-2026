/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef, FormEvent } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Flag,
  Home,
  Info,
  ListOrdered,
  LogOut,
  Play,
  Printer,
  RefreshCw,
  RotateCcw,
  Sparkles,
  User,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronDown,
  ExternalLink,
  ChevronUp,
  GraduationCap
} from 'lucide-react';
import { TESTS_DATA } from './data/testsData';
import { TestSet, Question, TestAttempt, UserAnswer } from './types';

export default function App() {
  // Onboarding credentials
  const [teacherName, setTeacherName] = useState<string>(() => {
    return localStorage.getItem('tue_tinh_teacher_name') || '';
  });
  const [schoolLabel, setSchoolLabel] = useState<string>(() => {
    return localStorage.getItem('tue_tinh_school') || '';
  });
  const [subjectArea, setSubjectArea] = useState<string>(() => {
    return localStorage.getItem('tue_tinh_subject') || 'Tiếng Anh THPT';
  });
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('tue_tinh_onboarded') === 'true';
  });

  // History state of attempts
  const [attempts, setAttempts] = useState<TestAttempt[]>(() => {
    const saved = localStorage.getItem('tue_tinh_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  // Active state
  const [activeTest, setActiveTest] = useState<TestSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({}); // questionId -> selectedOption
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({}); // questionId -> boolean
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Review states
  const [lastSubmittedAttempt, setLastSubmittedAttempt] = useState<TestAttempt | null>(null);
  const [reviewAttempt, setReviewAttempt] = useState<TestAttempt | null>(null);
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});
  const [activeReviewFilter, setActiveReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');

  // Timers and Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Auto-Save User Info
  const handleOnboard = (e: FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim()) return;
    localStorage.setItem('tue_tinh_teacher_name', teacherName.trim());
    localStorage.setItem('tue_tinh_school', schoolLabel.trim() || 'Trường THPT Tuệ Tĩnh');
    localStorage.setItem('tue_tinh_subject', subjectArea);
    localStorage.setItem('tue_tinh_onboarded', 'true');
    setIsOnboarded(true);
  };

  const handleLogout = () => {
    if (window.confirm('Thầy/Cô có chắc chắn muốn đặt lại cơ sở dữ liệu và thoát tài khoản?')) {
      localStorage.clear();
      setTeacherName('');
      setSchoolLabel('');
      setSubjectArea('Tiếng Anh THPT');
      setIsOnboarded(false);
      setAttempts([]);
      setActiveTest(null);
      setIsTestRunning(false);
      setLastSubmittedAttempt(null);
      setReviewAttempt(null);
    }
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (isTestRunning && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestRunning, secondsLeft]);

  // Formats seconds to mm:ss
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Compute stats
  const statistics = useMemo(() => {
    if (attempts.length === 0) return { avgScore: 0, totalTests: 0, completedCount: 0, level: 'Chưa đánh giá' };
    const completedCount = attempts.length;
    const avgScore = attempts.reduce((acc, a) => acc + a.score, 0) / completedCount;

    // Estimate CEFR level based on average score (max 20 questions)
    // < 10: Bậc 2 (A2), 10-14: Bậc 3 (B1), 15-18: Bậc 4 (B2), 19-20: Bậc 5 (C1)
    let level = 'Bậc 2 (A2)';
    if (avgScore >= 18.5) level = 'Bậc 5 (C1) - Rất xuất sắc';
    else if (avgScore >= 14.5) level = 'Bậc 4 (B2) - Đạt chuẩn THPT';
    else if (avgScore >= 9.5) level = 'Bậc 3 (B1) - Đạt chuẩn THCS';

    return {
      avgScore: parseFloat(avgScore.toFixed(1)),
      totalTests: completedCount,
      completedCount,
      level
    };
  }, [attempts]);

  // Select next non-overlapping test automatically
  const smartSelectNextTestId = () => {
    const lastFourTakenIds = attempts.slice(-4).map((a) => a.testSetId);
    // Find a test that was not taken in the last 4 runs to prevent repeat in 5 attempts
    const untaken = TESTS_DATA.filter((t) => !lastFourTakenIds.includes(t.id));
    if (untaken.length > 0) {
      return untaken[0].id;
    }
    // Fallback: pick the first one not equal to the absolute last one
    const lastId = attempts[attempts.length - 1]?.testSetId;
    const filtered = TESTS_DATA.filter((t) => t.id !== lastId);
    return filtered[0]?.id || TESTS_DATA[0].id;
  };

  const handleStartSmartQuiz = () => {
    const nextId = smartSelectNextTestId();
    const test = TESTS_DATA.find((t) => t.id === nextId);
    if (test) {
      handlePrepareTest(test);
    }
  };

  const handlePrepareTest = (test: TestSet) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setSecondsLeft(test.durationMinutes * 60);
    setIsTestRunning(true);
    setLastSubmittedAttempt(null);
    setReviewAttempt(null);
  };

  // Submit operations
  const handleSubmitTest = () => {
    if (!activeTest) return;

    let correctCount = 0;
    const answers: UserAnswer[] = activeTest.questions.map((q) => {
      const selected = selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect
      };
    });

    const percentage = Math.round((correctCount / activeTest.questions.length) * 100);

    // Calculate level recommendation
    let recommendedLevel = 'Khung năng lực ngoại ngữ VN: Bậc 2 (A2)';
    if (correctCount >= 19) {
      recommendedLevel = 'Bậc 5 (C1) - Năng lực Ngôn ngữ Sư phạm Xuất sắc';
    } else if (correctCount >= 15) {
      recommendedLevel = 'Bậc 4 (B2) - Đạt Chuẩn Giảng dạy THPT';
    } else if (correctCount >= 10) {
      recommendedLevel = 'Bậc 3 (B1) - Đạt chuẩn Cấp Tiểu học / THCS';
    } else {
      recommendedLevel = 'Bậc 2 (A2) - Cần cải thiện bồi dưỡng chuyên môn';
    }

    const spentTime = activeTest.durationMinutes * 60 - secondsLeft;

    const newAttempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      testSetId: activeTest.id,
      testSetTitle: activeTest.title,
      score: correctCount,
      totalQuestions: activeTest.questions.length,
      percentage,
      dateStr: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      spentTimeSeconds: spentTime,
      answers,
      recommendedLevel
    };

    const updated = [...attempts, newAttempt];
    setAttempts(updated);
    localStorage.setItem('tue_tinh_attempts', JSON.stringify(updated));

    setIsTestRunning(false);
    setActiveTest(null);
    setShowSubmitModal(false);
    setLastSubmittedAttempt(newAttempt);
    setReviewAttempt(newAttempt);

    // Reset scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAutoSubmit = () => {
    alert('Hết thời gian làm bài chính thức! Hệ thống tự động nộp bài khảo sát để đánh giá.');
    handleSubmitTest();
  };

  const currentQuestion: Question | undefined = activeTest?.questions[currentQuestionIndex];

  // Printable action
  const handlePrintCertificate = () => {
    window.print();
  };

  // Skill analysis breakdown
  const getReviewSkillStats = (attempt: TestAttempt, targetTest: TestSet) => {
    const stats = {
      use_of_english: { total: 0, correct: 0 },
      reading: { total: 0, correct: 0 },
      writing: { total: 0, correct: 0 },
      speaking: { total: 0, correct: 0 }
    };

    attempt.answers.forEach((ans) => {
      const question = targetTest.questions.find((q) => q.id === ans.questionId);
      if (question) {
        stats[question.type].total++;
        if (ans.isCorrect) {
          stats[question.type].correct++;
        }
      }
    });

    return stats;
  };

  // Find associated test structure for the reviewing attempt
  const reviewTargetTest = useMemo(() => {
    if (!reviewAttempt) return null;
    return TESTS_DATA.find((t) => t.id === reviewAttempt.testSetId) || null;
  }, [reviewAttempt]);

  const skillBreakdown = useMemo(() => {
    if (!reviewAttempt || !reviewTargetTest) return null;
    return getReviewSkillStats(reviewAttempt, reviewTargetTest);
  }, [reviewAttempt, reviewTargetTest]);

  // Filters questions shown during review based on select options
  const filteredReviewQuestions = useMemo(() => {
    if (!reviewAttempt || !reviewTargetTest) return [];
    return reviewTargetTest.questions.filter((q, index) => {
      const userAns = reviewAttempt.answers.find((a) => a.questionId === q.id);
      if (activeReviewFilter === 'all') return true;
      if (activeReviewFilter === 'correct') return userAns?.isCorrect === true;
      if (activeReviewFilter === 'wrong') return userAns?.isCorrect === false;
      return true;
    });
  }, [reviewAttempt, reviewTargetTest, activeReviewFilter]);

  // Seed default background or initial loading patterns
  return (
    <div id="app-root" className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-950 selection:text-indigo-100 leading-relaxed">
      {/* Visual background decorations - delicate, clean */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-indigo-950/20 to-transparent pointer-events-none" />

      {/* Elegant Professional Banner */}
      <header className="relative border-b border-slate-850 bg-[#020617]/80 backdrop-blur-md px-6 py-4 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-650 rounded-xl text-white shadow-lg shadow-indigo-550/10">
              <GraduationCap className="w-8 h-8 text-indigo-200" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                Hệ thống Demo Khảo sát Năng lực Tiếng Anh Giáo viên THPT Tuệ Tĩnh
              </h1>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>Khung Đánh giá Sư phạm 2026 (Bậc 2 - Bậc 4)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span className="font-semibold text-indigo-400">Tác giả: Ths Nguyễn Văn Thành</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            {isOnboarded && (
              <div className="flex items-center gap-3 bg-slate-900/50 backdrop-blur px-4 py-2 rounded-xl border border-slate-800 text-sm">
                <User className="w-4 h-4 text-indigo-400" />
                <div>
                  <span className="text-slate-500 text-xs block">Giáo viên:</span>
                  <span className="font-semibold text-slate-200">{teacherName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Đăng xuất / Reset"
                  className="ml-2 p-1 text-slate-500 hover:text-rose-450 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5 animate-pulse">
              <span className="w-2 quarter h-2 rounded-full bg-emerald-500"></span>
              MOET 2026 Standards
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 relative">
        {/* State 1: Onboarding Login */}
        {!isOnboarded ? (
          <div className="max-w-xl mx-auto mt-8 bg-slate-900/40 backdrop-blur-md border border-slate-850 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 bg-indigo-950/70 border-b border-indigo-900/30 text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Award className="w-32 h-32" />
              </div>
              <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Cổng Khảo sát Quốc gia 2026
              </span>
              <h2 className="text-2xl font-bold mt-2">Đăng ký Thông tin Dự khảo sát</h2>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Kính mời Thầy/Cô cung cấp thông tin giảng dạy chính thức để khởi tạo hồ sơ năng lực cá nhân và nhận báo cáo định hướng học tập chi tiết.
              </p>
            </div>

            <form onSubmit={handleOnboard} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5" htmlFor="t-name">
                  Họ và tên Giáo viên <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="t-name"
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all text-white placeholder-slate-600 shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5" htmlFor="t-school">
                    Đơn vị Công tác
                  </label>
                  <input
                    id="t-school"
                    type="text"
                    value={schoolLabel}
                    onChange={(e) => setSchoolLabel(e.target.value)}
                    placeholder="Ví dụ: THPT Tuệ Tĩnh"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all text-white placeholder-slate-600 shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5" htmlFor="t-subject">
                    Chuyên môn Giảng dạy
                  </label>
                  <select
                    id="t-subject"
                    value={subjectArea}
                    onChange={(e) => setSubjectArea(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all text-white shadow-inner cursor-pointer"
                  >
                    <option value="Tiếng Anh THPT" className="bg-slate-950 text-white">Tiếng Anh THPT</option>
                    <option value="Tiếng Anh THCS" className="bg-slate-950 text-white">Tiếng Anh THCS</option>
                    <option value="Tiếng Anh Tiểu Học" className="bg-slate-950 text-white">Tiếng Anh Tiểu Học</option>
                    <option value="Cán bộ Quản lý Giáo dục" className="bg-slate-950 text-white">Cán bộ Quản lý</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl text-xs space-y-2 text-slate-400">
                <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  Nguyên tắc bảo vệ năng lực khảo sát khép kín:
                </p>
                <p>
                  Để hỗ trợ Thầy/Cô trải nghiệm đánh giá một cách tối ưu, hệ thống tích hợp sẵn kho đề gồm <strong>100 câu hỏi chuyên nghiệp</strong> phân bổ thành 5 đề khảo sát.
                </p>
                <p className="text-indigo-400 font-medium font-mono bg-indigo-500/5 p-1.5 rounded border border-indigo-500/25">
                  ✓ Cam kết: 5 lần khảo sát gần nhất sẽ không bị trùng lặp bất kỳ câu hỏi nào nhờ cơ chế định vị lưu vết tự động.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-650/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Vào Hệ Thống Khảo Sát
              </button>
            </form>
          </div>
        ) : (
          /* Main Router Space when Onboarded */
          <div className="space-y-8">
            {/* Active Test Module */}
            {isTestRunning ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Right: Question Navigation Panel (Visible above on mobile, side-sticky on desktop) */}
                <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 relative backdrop-blur-md">
                  {/* Test Process Info Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                    <div>
                      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest block font-mono">
                        Đang làm bài • {activeTest?.title.split(':')[0]}
                      </span>
                      <h2 className="text-lg font-bold text-white mt-1 line-clamp-1">
                        {activeTest?.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl text-amber-400 font-mono text-lg font-bold shadow-sm">
                      <Clock className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                      <span>{formatTime(secondsLeft)}</span>
                    </div>
                  </div>

                  {/* Reading Passage Pane if applicable */}
                  {currentQuestion?.passage && (
                    <div className="mb-6 p-5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3 max-h-72 overflow-y-auto text-sm">
                      <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider sticky top-0 bg-slate-950/90 py-1 border-b border-slate-800">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <span>Văn bản Đọc hiểu tương ứng (Reading Passage)</span>
                      </div>
                      <div className="text-slate-300 font-serif leading-relaxed whitespace-pre-line text-sm pr-2">
                        {currentQuestion.passage}
                      </div>
                    </div>
                  )}

                  {/* Question Prompt */}
                  <div className="space-y-6">
                    <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-850">
                      <div className="flex items-start gap-3">
                        <span className="w-8 h-8 rounded-lg bg-indigo-650 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                          {currentQuestionIndex + 1}
                        </span>
                        <div>
                          <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold uppercase px-2 py-0.5 rounded tracking-wider">
                            {currentQuestion?.type === 'use_of_english' && 'Phần I: USE OF ENGLISH'}
                            {currentQuestion?.type === 'reading' && 'Phần II: READING'}
                            {currentQuestion?.type === 'writing' && 'Phần III: WRITING'}
                            {currentQuestion?.type === 'speaking' && 'Phần IV: SPEAKING'}
                          </span>
                          <p className="text-slate-100 font-serif tracking-wide text-base md:text-lg mt-3 leading-relaxed">
                            {currentQuestion?.questionText}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Radio Options Grid */}
                    <div className="space-y-3">
                      {currentQuestion?.options.map((option, idx) => {
                        const ABCD = ['A', 'B', 'C', 'D'];
                        const isSelected = selectedAnswers[currentQuestion.id] === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedAnswers(prev => ({
                                ...prev,
                                [currentQuestion.id]: idx
                              }));
                            }}
                            className={`flex items-center gap-3 px-5 py-4 border rounded-xl cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#020617]/50 border-indigo-550 ring-2 ring-indigo-500/20 text-white font-medium shadow-lg border-l-4 border-l-indigo-500'
                                : 'border-slate-800 bg-slate-900/30 hover:bg-slate-800/50 text-slate-300 hover:text-white'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-all ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {ABCD[idx]}
                            </span>
                            <span className="text-sm">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigator Footer Controls */}
                  <div className="flex items-center justify-between border-t border-slate-800 pt-5 mt-8 gap-3">
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-400 text-sm font-semibold rounded-xl bg-slate-900/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Quay Lại
                    </button>

                    <button
                      onClick={() => {
                        if (!currentQuestion) return;
                        setFlaggedQuestions(prev => ({
                          ...prev,
                          [currentQuestion.id]: !prev[currentQuestion.id]
                        }));
                      }}
                      className={`px-4 py-2 text-sm font-semibold rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                        flaggedQuestions[currentQuestion?.id || '']
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                          : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Flag className={`w-4 h-4 ${flaggedQuestions[currentQuestion?.id || ''] ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span>{flaggedQuestions[currentQuestion?.id || ''] ? 'Đã Nhớ Cắm Cờ' : 'Đánh Dấu'}</span>
                    </button>

                    {currentQuestionIndex < (activeTest?.questions.length || 0) - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/10 cursor-pointer"
                      >
                        Tiếp Theo
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowSubmitModal(true)}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/10 cursor-pointer"
                      >
                        Nộp Bài Khảo Sát
                      </button>
                    )}
                  </div>
                </div>

                {/* Right grid sidebar: Time & question palette */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Question Palette Matrix */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                    <h3 className="font-bold text-white border-b border-slate-800 pb-3 mb-4 flex items-center justify-between text-sm">
                      <span>Bản đồ Tiến trình Làm bài</span>
                      <span className="text-xs bg-slate-850 text-slate-400 font-medium px-2 py-0.5 rounded">
                        {Object.keys(selectedAnswers).length}/{activeTest?.questions.length} câu
                      </span>
                    </h3>

                    <div className="grid grid-cols-5 gap-2.5">
                      {activeTest?.questions.map((q, idx) => {
                        const isSelected = selectedAnswers[q.id] !== undefined;
                        const isFlagged = flaggedQuestions[q.id];
                        const isActive = idx === currentQuestionIndex;

                        let btnClass = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white';
                        if (isSelected) btnClass = 'bg-indigo-650/40 border-indigo-500 text-indigo-200';
                        if (isFlagged) btnClass = 'bg-amber-500/20 border-amber-500/45 text-amber-400 font-bold';
                        if (isActive) btnClass = 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 font-black ' + (isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white border-slate-705');

                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={`h-11 border text-sm font-semibold rounded-xl transition-all flex items-center justify-center relative cursor-pointer ${btnClass}`}
                            title={`${isSelected ? 'Đã chọn' : 'Chưa trả lời'} ${isFlagged ? ' - Đã cắm cờ' : ''}`}
                          >
                            {idx + 1}
                            {isFlagged && !isSelected && (
                              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800 text-xs space-y-2 text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-indigo-600/55 border border-indigo-550 inline-block"></span>
                        <span>Đã khoanh phương án</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-amber-500/30 border border-amber-500/40 inline-block"></span>
                        <span>Đã cắm cờ (Xem lại sau)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded border border-slate-800 bg-slate-950 inline-block"></span>
                        <span>Chưa làm bài</span>
                      </div>
                    </div>
                  </div>

                  {/* Caution / Tip Box */}
                  <div className="bg-slate-950/45 border border-slate-800 p-4 rounded-xl text-xs space-y-2 text-slate-400">
                    <p className="font-semibold text-slate-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
                      Lưu ý kiểm tra quan trọng:
                    </p>
                    <p>
                      Đánh giá mức độ phân tầng (CEFR Bậc 2 đến Bậc 4) yêu cầu Thầy/Cô tích hợp cân bằng cả phong cách phân tích, đọc hiểu và tiếng Anh học thuật sư phạm lớp học.
                    </p>
                    <p>
                      Bài khảo sát kéo dài <strong>20 phút</strong>. Nhấn nút <strong>Nộp Bài</strong> phía dưới bản đồ sau khi điền đầy đủ đáp án để kết xuất chứng thư kết quả nhanh.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* State 2: Dashboard Overview & Test Selection */
              <div className="space-y-8 animate-fadeIn">
                {/* Dashboard summary stats banner */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900/80 border border-indigo-500/25 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 text-white/5">
                      <Award className="w-24 h-24" />
                    </div>
                    <span className="text-indigo-400 text-xs uppercase font-mono tracking-wider font-semibold">Chuẩn CEFR Dự tính</span>
                    <h4 className="text-lg font-bold mt-2 leading-snug">
                      {attempts.length > 0 ? statistics.level.split(' - ')[0] : 'Chưa khảo sát'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2">
                      {attempts.length > 0 ? 'Dựa trên trung bình cộng điểm số các lượt thi gần nhất.' : 'Cung cấp kết quả CEFR chính thức sau lượt thi đầu tiên.'}
                    </p>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm shadow-sm">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Điểm khảo sát Trung bình</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-white">{attempts.length > 0 ? statistics.avgScore : '0'}</span>
                      <span className="text-slate-500 text-sm">/ 20 câu</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {attempts.length > 0 ? `Độ chín học lực: ~${Math.round((statistics.avgScore / 20) * 100)}% tổng lực.` : 'Chưa có dữ liệu.'}
                    </p>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm shadow-sm">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Lượt thi Đã hoàn thành</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-indigo-400">{attempts.length}</span>
                      <span className="text-slate-500 text-sm">/ 5 lần gần nhất</span>
                    </div>
                    <div className="mt-2.5 flex gap-1.5 overflow-x-auto py-0.5">
                      {[1, 2, 3, 4, 5].map((idx) => {
                        const isDone = attempts.length >= idx;
                        return (
                          <span
                            key={idx}
                            title={`Lần thi thứ ${idx}`}
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                              isDone ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-950 text-slate-600 border border-slate-850'
                            }`}
                          >
                            {isDone ? '✓' : idx}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Tình Trạng Kho Đồ Khảo sát</span>
                      <span className="text-xs text-slate-500 block mt-0.5">Thuật toán tự cân bằng không lặp</span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-emerald-400 font-semibold leading-tight">
                        Kiểm soát thông minh: 100 câu không bị trùng lặp
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Action Hub: Smart Start & List */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left block: Instructions & Core interactive buttons */}
                  <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6 backdrop-blur-md animate-fadeIn">
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        Chế độ Khảo sát Nhanh
                      </h3>
                      <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                        Thầy/Cô có thể bấm chọn kích hoạt <strong>Khảo sát Ngẫu nhiên Thông minh</strong> dưới đây. Hệ thống tự so đối lịch sử từ 5 đề để cấp phát tệp thi mới nhất, cam kết 100% không trùng bất kỳ câu hỏi nào.
                      </p>
                    </div>

                    <button
                      onClick={handleStartSmartQuiz}
                      className="w-full py-4 px-5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-850 text-white font-bold rounded-xl shadow-lg shadow-indigo-650/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Khảo Sát Ngẫu Nhiên Không Trùng Lặp
                    </button>

                    <div className="border-t border-slate-800 pt-5 space-y-3">
                      <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">
                        Nguyên tắc Thiết lập 2026:
                      </h4>
                      <ul className="text-xs text-slate-400 space-y-2.5">
                        <li className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-500/25 font-bold font-mono text-[9px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                          <span>Bám sát văn bản khảo sát năng lực Tiếng Anh dành cho giáo viên phổ thông của Bộ GD-ĐT.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-500/25 font-bold font-mono text-[9px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                          <span>Bổ sung đầy đủ gồm 4 phần chuẩn CEFR: Phần USE OF ENGLISH, Phần READING, Phần WRITING, và Phần SPEAKING.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-500/25 font-bold font-mono text-[9px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                          <span>Báo cáo kết quả hiển thị trực tiếp và giải thích tường tận từng phương án ngay sau khi bấm Nộp Bài.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-350 block mb-1">Thông cáo Bản quyền hệ thống:</span>
                      Biên soạn & Thiết lập chương trình bởi <strong>Ths Nguyễn Văn Thành</strong>, phục vụ cho công tác tự bồi dưỡng giáo viên Tiếng Anh THPT Tuệ Tĩnh trong kỷ nguyên số 2026.
                    </div>
                  </div>

                  {/* Right block: Grid details of all 5 available tests */}
                  <div className="lg:col-span-8 space-y-6">
                    <h3 className="font-bold text-white text-lg flex items-center justify-between">
                      <span>Danh mục 5 Đề Khảo sát Chuyên sâu sẵn có</span>
                      <span className="text-xs text-slate-500 font-normal">Học viên có thể trực tiếp chọn riêng từng đề</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      {TESTS_DATA.map((test) => {
                        const testAttempts = attempts.filter((a) => a.testSetId === test.id);
                        const isCompleted = testAttempts.length > 0;
                        const bestScore = isCompleted
                          ? Math.max(...testAttempts.map((a) => a.score))
                          : null;

                        return (
                          <div
                            key={test.id}
                            className="bg-slate-900/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 rounded-2xl p-5 shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-wider font-mono">
                                  {test.id.toUpperCase()}
                                </span>
                                {isCompleted && (
                                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                                    <Check className="w-3 h-3 text-emerald-400" /> Đã hoàn thành
                                  </span>
                                )}
                              </div>
                              <h4 className="text-base font-bold text-white mt-1">
                                {test.title}
                              </h4>
                              <p className="text-xs text-slate-400 max-w-xl">
                                {test.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
                                <span className="flex items-center gap-1 text-slate-400">
                                  <Clock className="w-3.5 h-3.5" /> {test.durationMinutes} phút
                                </span>
                                <span className="flex items-center gap-1 text-slate-400">
                                  <ListOrdered className="w-3.5 h-3.5" /> {test.questions.length} câu hỏi
                                </span>
                                {isCompleted && bestScore !== null && (
                                  <span className="text-emerald-400 font-semibold">
                                    Điểm cao nhất: {bestScore}/20
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-stretch md:self-auto justify-end shrink-0">
                              {isCompleted && (
                                <button
                                  onClick={() => {
                                    const lastAttempt = [...testAttempts].reverse()[0];
                                    setReviewAttempt(lastAttempt);
                                    window.scrollTo({ top: 300, behavior: 'smooth' });
                                  }}
                                  className="px-4 py-2 text-xs border border-slate-800 hover:bg-slate-850 hover:text-white bg-slate-950/40 text-slate-400 font-semibold rounded-xl transition-all cursor-pointer"
                                >
                                  Xem Đáp Án
                                </button>
                              )}
                              <button
                                onClick={() => handlePrepareTest(test)}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
                              >
                                {isCompleted ? 'Khảo Sát Lại' : 'Bắt Đầu'}
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* State 2.1: Certificate details & detailed answers if a previous attempt is chosen */}
                {reviewAttempt && reviewTargetTest && (
                  <div className="space-y-8 border-t border-slate-800 pt-8 animate-fadeIn">
                    {/* Header Review section */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-indigo-400 font-bold uppercase tracking-wider text-xs font-mono block">
                          Phân Tích Kết Quả & Giải Thích Chi Tiết
                        </span>
                        <h2 className="text-xl font-bold text-white mt-0.5">
                          Lịch sử xem lại: {reviewTargetTest.title}
                        </h2>
                        <p className="text-slate-400 text-xs mt-0.5">
                          Hoàn thành vào lúc: {reviewAttempt.dateStr} • Thời gian làm bài: {Math.floor(reviewAttempt.spentTimeSeconds / 60)} phút {reviewAttempt.spentTimeSeconds % 60} giây
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setReviewAttempt(null);
                          setLastSubmittedAttempt(null);
                        }}
                        className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold rounded-xl bg-slate-900/50 hover:bg-slate-850 transition-colors cursor-pointer"
                      >
                        Thu Gọn Review
                      </button>
                    </div>

                    {/* Highly Professional Signature Certificate for Print */}
                    <div className="bg-[#030712] border-4 border-double border-slate-800 rounded-3xl p-8 shadow-2xl max-w-3xl mx-auto relative print:my-0 print:border-none print:shadow-none">
                      <div className="absolute top-4 right-4 pointer-events-none opacity-5 print:opacity-20 select-none">
                        <GraduationCap className="w-48 h-48 text-indigo-400" />
                      </div>
                      
                      <div className="text-center space-y-6">
                        <div className="space-y-1">
                          <span className="text-xs uppercase tracking-widest font-serif font-black text-indigo-400 block pb-1">
                            HỘI ĐỒNG KHẢO SÁT CHUYÊN MÔN THPT TUỆ TĨNH
                          </span>
                          <span className="text-sm tracking-wide text-slate-450 font-serif font-semibold italic block font-serif">
                            Cơ sở dữ liệu Đánh giá Năng lực Sư phạm Ngoại ngữ 2026
                          </span>
                        </div>

                        <div className="w-16 h-0.5 bg-amber-500/65 mx-auto" />

                        <div className="space-y-2">
                          <h2 className="text-2xl font-serif md:text-3xl font-extrabold text-white tracking-tight uppercase">
                            BÁO CÁO KẾT QUẢ KHẢO SÁT
                          </h2>
                          <p className="text-sm font-serif text-slate-400 font-serif">
                            Hệ thống tự động ghi nhận và đóng mộc chứng thực năng lực sư phạm của:
                          </p>
                        </div>

                        <div className="space-y-1.5 cursor-default group py-1.5">
                          <p className="text-2xl font-serif font-bold text-indigo-200 border-b-2 border-dashed border-slate-850 max-w-lg mx-auto pb-1 transform group-hover:scale-105 transition-all text-white">
                            {teacherName}
                          </p>
                          <p className="text-xs text-slate-500 uppercase font-mono">
                            Đơn vị: {schoolLabel || 'Trường THPT Tuệ Tĩnh'} — Chuyên mục: {subjectArea}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 max-w-md mx-auto gap-4 py-4 text-center font-serif">
                          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                            <span className="text-[11px] text-slate-500 uppercase tracking-widest block">Số câu đúng</span>
                            <span className="text-2xl font-black font-mono text-indigo-450">{reviewAttempt.score} / 20</span>
                          </div>
                          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                            <span className="text-[11px] text-slate-500 uppercase tracking-widest block">Tỉ lệ chính xác</span>
                            <span className="text-2xl font-black font-mono text-emerald-400">{reviewAttempt.percentage}%</span>
                          </div>
                        </div>

                        <div className="bg-indigo-950/40 border border-indigo-900/30 px-5 py-3 rounded-2xl inline-block max-w-lg">
                          <span className="text-[10px] text-indigo-400 font-sans font-bold tracking-widest uppercase block mb-1">
                            Khuyến nghị Định vị CEFR:
                          </span>
                          <p className="text-sm font-bold text-indigo-200 font-serif leading-snug">
                            {reviewAttempt.recommendedLevel}
                          </p>
                        </div>

                        <p className="text-[11px] text-slate-500 italic max-w-md mx-auto leading-relaxed font-serif">
                          * Bản báo cáo được tự động kết xuất dựa trên 20 câu hỏi VSTEP ngẫu nhiên không lặp thuộc hệ thống bồi dưỡng của Ths Nguyễn Văn Thành, đảm bảo độ phủ 100% không trùng của 5 lần thi liên tiếp.
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-850 max-w-lg mx-auto">
                          <div className="text-left space-y-2">
                            <p className="text-xs font-serif text-slate-500">Mã Chứng chỉ:</p>
                            <p className="text-[11px] font-mono font-bold text-slate-450 font-semibold">TT-2026-ENG-{(reviewAttempt.id.split('-')[1] || '0').slice(-6)}</p>
                          </div>
                          
                          <div className="text-center space-y-1 relative">
                            {/* Signature Stamp Visual */}
                            <div className="absolute -top-10 -right-6 w-20 h-20 rounded-full border-4 border-rose-500 border-dotted flex items-center justify-center -rotate-12 opacity-35 select-none animate-pulse">
                              <span className="text-[9px] text-rose-500 font-bold uppercase tracking-tight text-center leading-none">
                                Đã duyệt<br />TUỆ TĨNH<br />2026
                              </span>
                            </div>

                            <p className="text-xs font-serif text-slate-505">Người lập học bạ</p>
                            <div className="h-6 py-2">
                              {/* Simulated elegant handwritten-like text signature */}
                              <span className="font-serif italic font-extrabold text-slate-300 text-sm tracking-wide">Ths. N.V.Thanh</span>
                            </div>
                            <p className="text-[10px] font-sans font-semibold text-slate-500">Ths Nguyễn Văn Thành</p>
                          </div>
                        </div>
                      </div>

                      {/* Print Command Floating UI */}
                      <div className="flex justify-center mt-6 p-4 border-t border-slate-850 gap-3 text-xs print:hidden">
                        <button
                          onClick={handlePrintCertificate}
                          className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
                        >
                          <Printer className="w-4 h-4 text-indigo-400" />
                          In Chứng Thư hoặc Lưu PDF
                        </button>
                      </div>
                    </div>

                    {/* Skill-by-skill Mastery indicators */}
                    {skillBreakdown && (
                      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-white text-sm mb-4">
                          Bảng Phân Tích Phân Nhóm Năng Lực Sư Phạm
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {Object.entries(skillBreakdown).map(([skillKey, value]) => {
                            const nameMap = {
                              use_of_english: 'USE OF ENGLISH',
                              reading: 'READING',
                              writing: 'WRITING',
                              speaking: 'SPEAKING'
                            };
                            const skillVal = value as { total: number; correct: number };
                            const percent = skillVal.total > 0 ? Math.round((skillVal.correct / skillVal.total) * 100) : 0;
                            return (
                              <div key={skillKey} className="border border-slate-800 rounded-xl p-4 bg-slate-900/60 shadow-sm">
                                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                                  {nameMap[skillKey as keyof typeof nameMap]}
                                </span>
                                <div className="flex items-baseline justify-between mt-2 font-mono">
                                  <span className="text-xl font-bold text-white">
                                    {skillVal.correct}/{skillVal.total}
                                  </span>
                                  <span className={`text-xs font-semibold ${percent >= 70 ? 'text-emerald-400' : percent >= 45 ? 'text-amber-400' : 'text-rose-400'}`}>
                                    {percent}%
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-950/80 rounded-full mt-2.5 overflow-hidden border border-slate-850">
                                  <div
                                    className={`h-full rounded-full ${percent >= 70 ? 'bg-emerald-500' : percent >= 45 ? 'bg-amber-400' : 'bg-rose-500'}`}
                                    style={{ width: `${percent}%` }}
                                    id={`percent-bar-${skillKey}`}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Detailed Answer Review List */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl shadow-sm p-6 overflow-hidden">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3">
                        <h3 className="font-bold text-white text-base">
                          Danh Sách Câu Hỏi & Đáp Án Giải Thích Chi Tiết
                        </h3>

                        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl text-xs border border-slate-850">
                          <button
                            onClick={() => setActiveReviewFilter('all')}
                            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                              activeReviewFilter === 'all' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Tất cả ({reviewTargetTest.questions.length})
                          </button>
                          <button
                            onClick={() => setActiveReviewFilter('correct')}
                            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                              activeReviewFilter === 'correct' ? 'bg-emerald-600/30 text-emerald-400' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Làm Đúng ({reviewAttempt.answers.filter((a) => a.isCorrect).length})
                          </button>
                          <button
                            onClick={() => setActiveReviewFilter('wrong')}
                            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                              activeReviewFilter === 'wrong' ? 'bg-rose-650/30 text-rose-400' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Làm Sai ({reviewAttempt.answers.filter((a) => !a.isCorrect).length})
                          </button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {filteredReviewQuestions.map((q) => {
                          const userAns = reviewAttempt.answers.find((a) => a.questionId === q.id);
                          const isCorrect = userAns?.isCorrect;
                          const selectedOptionIndex = userAns ? userAns.selectedOption : -1;
                          const isExpanded = expandedExplanations[q.id];

                          return (
                            <div
                              key={q.id}
                              className={`border rounded-2xl p-5 transition-all ${
                                isCorrect
                                  ? 'bg-emerald-950/15 border-emerald-900/30'
                                  : 'bg-rose-955/15 border-rose-900/30'
                              }`}
                            >
                              {/* Header question status bar */}
                              <div className="flex items-start justify-between gap-3 pb-3 border-b border-dashed border-slate-850">
                                <div>
                                  <span className="text-xs bg-slate-850 text-slate-400 px-2 py-0.5 rounded tracking-wider uppercase font-mono font-semibold">
                                    {q.type}
                                  </span>
                                  <h4 className="font-semibold text-slate-200 mt-1 text-sm line-clamp-1">
                                    {q.questionText}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {isCorrect ? (
                                    <span className="px-2.5 py-1 bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-[11px] font-bold rounded-full flex items-center gap-1">
                                      <Check className="w-3 h-3" /> Chính Xác
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-1 bg-rose-950/40 border border-rose-800 text-rose-400 text-[11px] font-bold rounded-full flex items-center gap-1">
                                      <XCircle className="w-3 h-3" /> Chưa Đúng
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Question Detail Description */}
                              <div className="py-4 font-normal text-sm text-slate-300 space-y-3">
                                <p className="font-semibold text-white">{q.questionText}</p>
                                
                                {q.passage && (
                                  <div className="p-3 bg-slate-950/40 border border-slate-850 text-slate-400 text-xs rounded-xl max-h-40 overflow-y-auto font-serif">
                                    <span className="font-bold block mb-1 text-slate-300">Trích đoạn Đọc hiểu liên quan:</span>
                                    {q.passage}
                                  </div>
                                )}

                                {/* Choice selection logs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                                  {q.options.map((option, oIdx) => {
                                    const ABC = ['A', 'B', 'C', 'D'];
                                    const isChosenByTeacher = selectedOptionIndex === oIdx;
                                    const isCorrectChoice = q.correctIndex === oIdx;

                                    let optionBadge = 'border-slate-850 bg-slate-900/30 text-slate-400';
                                    if (isCorrectChoice) {
                                      optionBadge = 'border-emerald-800/80 bg-emerald-950/30 text-emerald-300 font-semibold';
                                    } else if (isChosenByTeacher && !isCorrectChoice) {
                                      optionBadge = 'border-rose-800/80 bg-rose-950/30 text-rose-300 font-semibold';
                                    }

                                    return (
                                      <div
                                        key={oIdx}
                                        className={`p-3 border rounded-xl flex items-center gap-2 ${optionBadge}`}
                                      >
                                        <span className={`w-5 h-5 rounded text-[10px] font-bold font-mono flex items-center justify-center ${
                                          isCorrectChoice
                                            ? 'bg-emerald-600 text-white'
                                            : isChosenByTeacher
                                            ? 'bg-rose-600 text-white'
                                            : 'bg-slate-800 text-slate-400'
                                        }`}>
                                          {ABC[oIdx]}
                                        </span>
                                        <span className="flex-1 leading-snug">{option}</span>
                                        {isCorrectChoice && <span className="text-[9px] bg-emerald-600 text-white px-1 py-0.2 rounded uppercase font-bold shrink-0">Đáp Án Đúng</span>}
                                        {isChosenByTeacher && !isCorrectChoice && <span className="text-[9px] bg-rose-650 text-white px-1 py-0.2 rounded uppercase font-bold shrink-0">Đã Chọn</span>}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Expansion Panel Trigger */}
                              <div className="border-t border-slate-850 pt-3">
                                <button
                                  onClick={() => {
                                    setExpandedExplanations((prev) => ({
                                      ...prev,
                                      [q.id]: !prev[q.id]
                                    }));
                                  }}
                                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-all focus:outline-none cursor-pointer"
                                >
                                  {isExpanded ? (
                                    <>
                                      <span>Ẩn giải thích chi tiết & dịch nghĩa</span>
                                      <ChevronUp className="w-3.5 h-3.5" />
                                    </>
                                  ) : (
                                    <>
                                      <span>Xem giải thích chi tiết & dịch nghĩa</span>
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    </>
                                  )}
                                </button>

                                {isExpanded && (
                                  <div className="mt-3.5 p-4 bg-indigo-950/20 rounded-xl border border-indigo-900/30 text-xs space-y-3 animate-fadeIn text-slate-350 leading-relaxed font-serif">
                                    {q.vietnameseTranslation && (
                                      <div className="space-y-1">
                                        <span className="font-bold text-indigo-455 uppercase tracking-wider block text-[10px]">
                                          Dịch nghĩa Tiếng Việt:
                                        </span>
                                        <p className="italic text-indigo-200 font-medium font-serif">“{q.vietnameseTranslation}”</p>
                                      </div>
                                    )}

                                    <div className="space-y-1 pt-1.5 border-t border-indigo-900/30">
                                      <span className="font-bold text-indigo-455 uppercase tracking-wider block text-[10px]">
                                        Giải thích ngữ pháp & tình huống:
                                      </span>
                                      <p className="whitespace-pre-line text-slate-300">{q.explanation}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {filteredReviewQuestions.length === 0 && (
                          <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
                            <span className="text-slate-500 block text-sm">Không tìm thấy câu hỏi tương ứng với bộ lọc.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Confirmation Submit Modal Overlay */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-[#030208]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0c16] rounded-2xl shadow-2xl max-w-md w-full border border-slate-800 overflow-hidden animate-scaleIn">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Nộp bài khảo sát?</h3>
                <p className="text-sm text-slate-400">
                  Thầy/Cô đã hoàn thành <strong>{Object.keys(selectedAnswers).length}/{activeTest?.questions.length}</strong> nhiệm vụ kiểm thử. Kính mong Thầy/Cô xác nhận để đóng gói hộc bạ đánh giá.
                </p>
              </div>

              {Object.keys(selectedAnswers).length < (activeTest?.questions.length || 0) && (
                <div className="bg-amber-950/40 border border-amber-900/50 p-3 rounded-xl text-xs text-amber-300 font-medium leading-relaxed font-serif">
                  ⚠️ Lưu ý: Thầy/Cô còn một vài câu hỏi chưa hoàn tất. Hệ thống sẽ tự ghi nhận là chưa trả lời nếu nộp bây giờ.
                </div>
              )}
            </div>

            <div className="flex border-t border-slate-850">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-4 text-center font-bold text-sm text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors border-r border-slate-850 focus:outline-none cursor-pointer"
              >
                Tiếp Tục Làm
              </button>
              <button
                onClick={handleSubmitTest}
                className="flex-1 py-4 text-center font-bold text-sm text-indigo-400 hover:text-indigo-300 hover:bg-slate-900/60 transition-colors focus:outline-none cursor-pointer"
              >
                Xác Nhận Nộp Bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature and educational footer */}
      <footer className="border-t border-slate-900 bg-[#030611]/90 backdrop-blur pb-12 pt-8 text-center text-slate-500 text-xs mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-350 font-semibold">
            <Award className="w-4 h-4 text-indigo-455" />
            <span>Hệ thống Demo Khảo sát Năng lực Tiếng Anh Giáo viên THPT Tuệ Tĩnh</span>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed font-serif text-slate-450">
            Dự án nghiên cứu sư phạm ứng dụng cho giáo viên phổ thông năm 2026. Chương trình thiết lập hoàn chỉnh tự động xoay chuyển đề khảo sát, ngăn ngừa triệt để hiện tượng trùng lắp câu hỏi trong 5 lần lấy mẫu liên tiếp.
          </p>
          <div className="text-slate-600">
            <span>© 2026 Tuệ Tĩnh High School. All Rights Reserved. Biên soạn bởi <strong>Ths Nguyễn Văn Thành</strong>.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
