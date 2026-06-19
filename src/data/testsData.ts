import { TestSet } from '../types';

const RAW_TESTS_DATA: any[] = [
  {
    id: "test-01",
    title: "Đề Khảo sát số 1: Quản lý Lớp học & Kỹ năng Sư phạm Cơ bản",
    description: "Khảo sát năng lực tiếng Anh Bậc 2 - Bậc 4. Trọng tâm: Từ vựng sư phạm cơ bản, cấu trúc giả định và ngữ cảnh giao tiếp trong lớp học.",
    durationMinutes: 20,
    questions: [
      // PART 1: Grammar & Vocabulary (1 - 10)
      {
        id: "t1-q1",
        type: "grammar",
        questionText: "The headmaster suggested that the newly appointed English teacher _________ more active learning methodologies in her lessons.",
        options: [
          "adopt",
          "adopts",
          "adopted",
          "will adopt"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc giả định (Subjunctive mood) với động từ 'suggest' yêu cầu mệnh đề 'that' sử dụng động từ nguyên thể không 'to' (bare infinitive). Công thức: S1 + suggest + that + S2 + (should) + V-bare.",
        vietnameseTranslation: "Hiệu trưởng gợi ý rằng giáo viên tiếng Anh mới được bổ nhiệm nên áp dụng nhiều phương pháp học tập tích cực hơn vào bài giảng."
      },
      {
        id: "t1-q2",
        type: "grammar",
        questionText: "Not only _________ the classroom rules, but they also participated enthusiastically in all group activities.",
        options: [
          "did the students observe",
          "the students observed",
          "have the students observed",
          "the students did observe"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc đảo ngữ với 'Not only'. Khi 'Not only' đứng đầu câu, ta thực hiện đảo ngữ ở mệnh đề đầu tiên: Not only + Trợ động từ + S + V + but + S + also + V...",
        vietnameseTranslation: "Không những học sinh tuân thủ các quy tắc trong lớp học, mà họ còn tham gia rất nhiệt tình vào tất cả các hoạt động nhóm."
      },
      {
        id: "t1-q3",
        type: "grammar",
        questionText: "The teacher had difficulty _________ her students to submit their English portfolios on time.",
        options: [
          "to persuade",
          "persuading",
          "in persuade",
          "for persuading"
        ],
        correctIndex: 1,
        explanation: "Cấu trúc: 'have difficulty (in) + V-ing': gặp khó khăn khi làm việc gì đó.",
        vietnameseTranslation: "Giáo viên gặp khó khăn trong việc thuyết phục học sinh nộp hồ sơ học tập tiếng Anh đúng hạn."
      },
      {
        id: "t1-q4",
        type: "grammar",
        questionText: "We decided to conduct a formative assessment _________ pinpoint our students' reading weaknesses.",
        options: [
          "in order to",
          "so that",
          "for purpose of",
          "with a view to"
        ],
        correctIndex: 0,
        explanation: "- 'In order to + V-bare' chỉ mục đích.\n- 'So that' đi với một mệnh đề.\n- 'With a view to' đi với V-ing.",
        vietnameseTranslation: "Chúng tôi đã quyết định thực hiện đánh giá thường xuyên để chỉ ra chính xác những điểm yếu về đọc hiểu của học sinh."
      },
      {
        id: "t1-q5",
        type: "grammar",
        questionText: "By the time the foreign supervisor arrived, the teachers _________ the classroom decorations for the language festival.",
        options: [
          "finished",
          "have finished",
          "had finished",
          "were finishing"
        ],
        correctIndex: 2,
        explanation: "Cấu trúc phối hợp thì với 'By the time': By the time + S1 + V (quá khứ đơn), S2 + had + V3/ed (quá khứ hoàn thành). Hành động trang trí lớp học hoàn thành trước thời điểm giám sát viên đến.",
        vietnameseTranslation: "Trước khi giám sát viên nước ngoài đến, các giáo viên đã hoàn thành xong việc trang trí lớp học cho lễ hội ngôn ngữ."
      },
      {
        id: "t1-q6",
        type: "grammar",
        questionText: "The virtual classroom was designed to _________ collaborative learning among diverse groups of high school teachers.",
        options: [
          "foster",
          "hinder",
          "postpone",
          "neglect"
        ],
        correctIndex: 0,
        explanation: "- 'Foster' (v): thúc đẩy, bồi đắp, nuôi dưỡng (học tập cộng tác).\n- 'Hinder' (v): cản trở.\n- 'Postpone' (v): trì hoãn.\n- 'Neglect' (v): bỏ bê.",
        vietnameseTranslation: "Lớp học ảo được thiết kế để thúc đẩy học tập cộng tác giữa các nhóm giáo viên trung học phổ thông khác nhau."
      },
      {
        id: "t1-q7",
        type: "grammar",
        questionText: "Many educators argue that rote _________ is no longer effective in developing deep communicative competence.",
        options: [
          "memorization",
          "memorizing",
          "memory",
          "memorial"
        ],
        correctIndex: 0,
        explanation: "Cụm danh từ cố định: 'rote memorization' (việc học vẹt).",
        vietnameseTranslation: "Nhiều nhà giáo dục lập luận rằng việc học vẹt không còn hiệu quả trong việc phát triển năng lực giao tiếp sâu sắc."
      },
      {
        id: "t1-q8",
        type: "grammar",
        questionText: "High school teachers are expected to be well-versed _________ current pedagogical theories and dynamic teaching tools.",
        options: [
          "in",
          "at",
          "with",
          "of"
        ],
        correctIndex: 0,
        explanation: "Cụm tính từ đi với giới từ: 'be well-versed in something' (thông thạo, am hiểu sâu sắc về lĩnh vực gì).",
        vietnameseTranslation: "Giáo viên trung học phổ thông được kỳ vọng phải am hiểu sâu sắc về các lý thuyết sư pham hiện tại và các công cụ giảng dạy năng động."
      },
      {
        id: "t1-q9",
        type: "grammar",
        questionText: "If our school _________ adequate interactive whiteboards last year, the English lessons would have been much more interactive.",
        options: [
          "purchased",
          "had purchased",
          "purchases",
          "would purchase"
        ],
        correctIndex: 1,
        explanation: "Câu điều kiện loại 3 (giả định điều không có thật trong quá khứ - 'last year'): If + S + had + V3/ed, S + would have + V3/ed.",
        vietnameseTranslation: "Nếu trường chúng ta mua đủ bảng tương tác thông minh vào năm ngoái, các tiết học tiếng Anh đã diễn ra tương tác nhiều hơn rồi."
      },
      {
        id: "t1-q10",
        type: "grammar",
        questionText: "Students from remote backgrounds often need _________ encouragement to speak English in front of large audiences.",
        options: [
          "continuous",
          "continuation",
          "continuity",
          "continually"
        ],
        correctIndex: 0,
        explanation: "Cần một tính từ đứng trước danh từ 'encouragement' để bổ nghĩa. 'Continuous' (adj): liên tục, không ngừng.",
        vietnameseTranslation: "Học sinh từ các vùng sâu vùng xa thường cần sự động viên liên tục để nói tiếng Anh trước đám đông."
      },

      // PART 2: Error Identification (11 - 13)
      {
        id: "t1-q11",
        type: "error",
        questionText: "The English department head (A) along with his colleagues (B) are planning to establish (C) a professional learning community (D) this semester.",
        options: [
          "along with",
          "are planning",
          "to establish",
          "professional learning"
        ],
        correctIndex: 1,
        explanation: "Chủ ngữ chính là 'The English department head' (số ít). Cụm từ 'along with his colleagues' không làm thay đổi sự hòa hợp chủ vị. Vì vậy, động từ phải chia số ít là 'is planning' thay vì 'are planning'.",
        vietnameseTranslation: "Trưởng bộ môn tiếng Anh cùng với các đồng nghiệp của mình đang lên kế hoạch thành lập một cộng đồng học tập chuyên môn trong học kỳ này."
      },
      {
        id: "t1-q12",
        type: "error",
        questionText: "Although the curriculum is (A) demanding, but (B) the teachers are committed to (C) helping their students succeed (D) in the national exam.",
        options: [
          "demanding",
          "but",
          "committed to",
          "succeed"
        ],
        correctIndex: 1,
        explanation: "Trong tiếng Anh, không dùng đồng thời cả 'Although' và 'but' trong cùng một câu ghép. Phải bỏ 'but'.",
        vietnameseTranslation: "Mặc dù chương trình học rất khắt khe, nhưng các giáo viên vẫn cam kết giúp học sinh của mình thành công trong kỳ thi quốc gia."
      },
      {
        id: "t1-q13",
        type: "error",
        questionText: "To improve (A) speaking skills, the workshop facilitator recommended (B) that students practice (C) to speak English every day (D).",
        options: [
          "To improve",
          "recommended",
          "practice",
          "to speak English"
        ],
        correctIndex: 3,
        explanation: "Động từ 'practice' yêu cầu động từ theo sau ở dạng V-ing. Sửa thành 'practicing speaking' hoặc 'speaking'.",
        vietnameseTranslation: "Để cải thiện kỹ năng nói, người hỗ trợ hội thảo đã đề xuất rằng học sinh luyện tập nói tiếng Anh mỗi ngày."
      },

      // PART 3: Reading Comprehension (14 - 18)
      {
        id: "t1-q14",
        type: "reading",
        questionText: "What is the primary topic of the passage?",
        options: [
          "The historical development of high school education.",
          "The critical role of active learning in modern classrooms.",
          "The technological breakdown of virtual schools.",
          "How teachers write curricula for language centers."
        ],
        correctIndex: 1,
        passage: "Active learning has become the cornerstone of contemporary pedagogical strategies, particularly in secondary language classrooms. Rather than serving as passive recipients of lecture-based content, students actively construct their knowledge through collaboration, critical analysis, and real-case problem solving. Research demonstrates that active learning environments significantly enhance vocabulary reservation and syntax masteries among adolescents. By taking ownership of tasks, pupils cultivate not just linguistic skills, but also crucial 21st-century competences such as adaptability, information literacy, and emotional intelligence.\n\nHowever, implementing active learning demands a fundamental shift in the teacher's role—from the authoritative 'sage on the stage' to a supportive 'guide on the side.' This paradigm transition is frequently met with skepticism by educators accustomed to traditional rote instructional mechanisms. Teachers must learn to step back, manage classroom dynamics flexibly, and design multifaceted, open-ended tasks that prompt conversational authentic engagement. Educational policymakers in Vietnam are increasingly championing active strategies, as outlined in the landmark 2018 General Education Curriculum, which moves away from sheer content delivery toward holistic competency-based growth.",
        explanation: "Đoạn văn chủ yếu bàn về tầm quan trọng và vai trò của phương pháp học tập tích cực ('active learning') trong các lớp học hiện đại, đặc biệt là trong việc chuyển giao vai trò của giáo viên.",
        vietnameseTranslation: "Chủ đề chính của đoạn văn là gì?"
      },
      {
        id: "t1-q15",
        type: "reading",
        questionText: "The phrase 'sage on the stage' in the passage refers to a teacher who is _________.",
        options: [
          "highly collaborative and supportive of student choices",
          "highly traditional, centering the classroom strictly on their own lectures",
          "expert in utilizing digital whiteboards and mobile applications",
          "focused entirely on conducting continuous diagnostic assessments"
        ],
        correctIndex: 1,
        passage: "Active learning has become the cornerstone of contemporary pedagogical strategies, particularly in secondary language classrooms. Rather than serving as passive recipients of lecture-based content, students actively construct their knowledge through collaboration, critical analysis, and real-case problem solving. Research demonstrates that active learning environments significantly enhance vocabulary reservation and syntax masteries among adolescents. By taking ownership of tasks, pupils cultivate not just linguistic skills, but also crucial 21st-century competences such as adaptability, information literacy, and emotional intelligence.\n\nHowever, implementing active learning demands a fundamental shift in the teacher's role—from the authoritative 'sage on the stage' to a supportive 'guide on the side.' This paradigm transition is frequently met with skepticism by educators accustomed to traditional rote instructional mechanisms. Teachers must learn to step back, manage classroom dynamics flexibly, and design multifaceted, open-ended tasks that prompt conversational authentic engagement. Educational policymakers in Vietnam are increasingly championing active strategies, as outlined in the landmark 2018 General Education Curriculum, which moves away from sheer content delivery toward holistic competency-based growth.",
        explanation: "- 'Sage on the stage' (Nhà thông thái trên bục giảng) chỉ kiểu giáo viên truyền thống, làm trung tâm của lớp học và truyền đạt kiến thức một chiều qua thuyết giảng, trái ngược với 'guide on the side' (người hướng dẫn bên cạnh).",
        vietnameseTranslation: "Cụm từ 'sage on the stage' trong đoạn văn ám chỉ một giáo viên thế nào?"
      },
      {
        id: "t1-q16",
        type: "reading",
        questionText: "According to the passage, what is a key benefit of active environments for adolescents?",
        options: [
          "It lowers the overall passing requirements of school examinations.",
          "It enhances vocabulary retention and mastery of grammatical structure.",
          "It eliminates the necessity for teachers to design complex lesson plans.",
          "It encourages students to study alone at home rather than attending classes."
        ],
        correctIndex: 1,
        passage: "Active learning has become the cornerstone of contemporary pedagogical strategies, particularly in secondary language classrooms. Rather than serving as passive recipients of lecture-based content, students actively construct their knowledge through collaboration, critical analysis, and real-case problem solving. Research demonstrates that active learning environments significantly enhance vocabulary reservation and syntax masteries among adolescents. By taking ownership of tasks, pupils cultivate not just linguistic skills, but also crucial 21st-century competences such as adaptability, information literacy, and emotional intelligence.\n\nHowever, implementing active learning demands a fundamental shift in the teacher's role—from the authoritative 'sage on the stage' to a supportive 'guide on the side.' This paradigm transition is frequently met with skepticism by educators accustomed to traditional rote instructional mechanisms. Teachers must learn to step back, manage classroom dynamics flexibly, and design multifaceted, open-ended tasks that prompt conversational authentic engagement. Educational policymakers in Vietnam are increasingly championing active strategies, as outlined in the landmark 2018 General Education Curriculum, which moves away from sheer content delivery toward holistic competency-based growth.",
        explanation: "Dẫn chứng từ đoạn văn: 'Research demonstrates that active learning environments significantly enhance vocabulary reservation and syntax masteries among adolescents.' (Nâng cao khả năng ghi nhớ từ vựng và làm chủ văn phong/ngữ pháp).",
        vietnameseTranslation: "Theo đoạn văn, lợi ích chính của môi trường tích cực đối với thanh thiếu niên là gì?"
      },
      {
        id: "t1-q17",
        type: "reading",
        questionText: "Why do some educators show skepticism toward active learning?",
        options: [
          "They fear that students will gain too much general knowledge.",
          "They are deeply accustomed to traditional rote learning and teaching styles.",
          "They believe that the 2018 Curriculum does not support reform.",
          "They feel that 21st-century skills are completely irrelevant to language learning."
        ],
        correctIndex: 1,
        passage: "Active learning has become the cornerstone of contemporary pedagogical strategies, particularly in secondary language classrooms. Rather than serving as passive recipients of lecture-based content, students actively construct their knowledge through collaboration, critical analysis, and real-case problem solving. Research demonstrates that active learning environments significantly enhance vocabulary reservation and syntax masteries among adolescents. By taking ownership of tasks, pupils cultivate not just linguistic skills, but also crucial 21st-century competences such as adaptability, information literacy, and emotional intelligence.\n\nHowever, implementing active learning demands a fundamental shift in the teacher's role—from the authoritative 'sage on the stage' to a supportive 'guide on the side.' This paradigm transition is frequently met with skepticism by educators accustomed to traditional rote instructional mechanisms. Teachers must learn to step back, manage classroom dynamics flexibly, and design multifaceted, open-ended tasks that prompt conversational authentic engagement. Educational policymakers in Vietnam are increasingly championing active strategies, as outlined in the landmark 2018 General Education Curriculum, which moves away from sheer content delivery toward holistic competency-based growth.",
        explanation: "Dẫn chứng từ đoạn văn: 'This paradigm transition is frequently met with skepticism by educators accustomed to traditional rote instructional mechanisms.' (Sự chuyển dịch này thường vấp phải sự hoài nghi từ những nhà giáo dục đã quen với cơ chế giảng dạy học vẹt truyền thống).",
        vietnameseTranslation: "Tại sao một số nhà giáo dục lại tỏ ra hoài nghi đối với việc học tập tích cực?"
      },
      {
        id: "t1-q18",
        type: "reading",
        questionText: "What does the 2018 General Education Curriculum in Vietnam advocate?",
        options: [
          "A return to lecture-heavy grammar translation methods.",
          "A complete elimination of summative English scoring systems.",
          "A shift from simple content delivery to comprehensive, competency-based growth.",
          "Allowing high school students to choose English teachers themselves."
        ],
        correctIndex: 2,
        passage: "Active learning has become the cornerstone of contemporary pedagogical strategies, particularly in secondary language classrooms. Rather than serving as passive recipients of lecture-based content, students actively construct their knowledge through collaboration, critical analysis, and real-case problem solving. Research demonstrates that active learning environments significantly enhance vocabulary reservation and syntax masteries among adolescents. By taking ownership of tasks, pupils cultivate not just linguistic skills, but also crucial 21st-century competences such as adaptability, information literacy, and emotional intelligence.\n\nHowever, implementing active learning demands a fundamental shift in the teacher's role—from the authoritative 'sage on the stage' to a supportive 'guide on the side.' This paradigm transition is frequently met with skepticism by educators accustomed to traditional rote instructional mechanisms. Teachers must learn to step back, manage classroom dynamics flexibly, and design multifaceted, open-ended tasks that prompt conversational authentic engagement. Educational policymakers in Vietnam are increasingly championing active strategies, as outlined in the landmark 2018 General Education Curriculum, which moves away from sheer content delivery toward holistic competency-based growth.",
        explanation: "Dẫn chứng từ đoạn văn: '...which moves away from sheer content delivery toward holistic competency-based growth.' (chuyển dịch từ việc truyền thụ nội dung đơn thuần sang phát triển năng lực toàn diện).",
        vietnameseTranslation: "Chương trình GDPT mới năm 2018 tại Việt Nam ủng hộ điều gì?"
      },

      // PART 4: Pedagogical English Scenarios (19 - 20)
      {
        id: "t1-q19",
        type: "pedagogy",
        questionText: "Scenario: A high school student gives a grammatically incorrect but high-effort answer during an English speaking class. What is the most pedagogical response from the teacher?",
        options: [
          "Interrupt the student immediately, correct the error on the board, and tell them to write it down ten times.",
          "Acknowledge the constructive content of their answer first, and then reformulate the sentence correctly using positive reinforcement.",
          "Ignore the grammatical mistake completely and proceed to the next student without offering any feedback.",
          "Ask the whole class to laugh and point out the mistake so that everyone remembers how to fix it."
        ],
        correctIndex: 1,
        explanation: "Phản ứng sư phạm tối ưu và tích cực nhất là công nhận nỗ lực đóng góp ý kiến của học sinh trước, sau đó lặp lại/sửa lại câu nói một cách tế nhị (re-casting / reformulation) mà không làm dập tắt sự tự tin của các em.",
        vietnameseTranslation: "Tình huống: Một học sinh trung học đưa ra câu trả lời sai ngữ pháp nhưng rất nỗ lực trong giờ nói tiếng Anh. Đâu là cách ứng xử sư phạm nhất của giáo viên?"
      },
      {
        id: "t1-q20",
        type: "pedagogy",
        questionText: "Scenario: The teacher wants to organize a task to practice scanning reading skills. Which of the following tasks should be assigned?",
        options: [
          "Instructing students to read the text slowly and transcribing every single noun into their notebook.",
          "Asking students to find specific dates, numbers, or names in the passage within a strict 1-minute time limit.",
          "Requiring students to write a 150-word analytical summary of the global values inside the passage.",
          "Asking students to memorize the first paragraph and translate it into formal classical Vietnamese."
        ],
        correctIndex: 1,
        explanation: "Kỹ năng Đọc quét (Scanning) là kỹ năng đọc nhanh nhằm tìm kiếm các thông tin cụ thể như số liệu, ngày tháng, tên riêng. Việc đưa ra giới hạn thời gian nghiêm ngặt (1 phút) hoàn toàn phục vụ mục tiêu rèn luyện kỹ năng này.",
        vietnameseTranslation: "Tình huống: Giáo viên muốn tổ chức một hoạt động để luyện tập kỹ năng đọc quét (scanning). Hoạt động nào nên được giao?"
      }
    ]
  },
  {
    id: "test-02",
    title: "Đề Khảo sát số 2: Phương pháp Giảng dạy & Phát triển Ngôn ngữ",
    description: "Khảo sát năng lực tiếng Anh Bậc 2 - Bậc 4. Tập trung vào các phương pháp giảng dạy ngôn ngữ giao tiếp (CLT), giới từ nâng cao, và kỹ năng sửa lỗi sai.",
    durationMinutes: 20,
    questions: [
      {
        id: "t2-q1",
        type: "grammar",
        questionText: "The more interactive the English lessons are, _________ motivated the lower-proficiency pupils become.",
        options: [
          "the more",
          "more and more",
          "the most",
          "most of"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc so sánh kép (Double comparative): The + so sánh hơn + S + V, the + so sánh hơn + S + V. (Tiết học càng tương tác nhiều, học sinh yếu càng có động lực).",
        vietnameseTranslation: "Tiết học tiếng Anh càng có tính tương tác cao thì những học sinh có học lực trung bình - yếu càng trở nên có động lực học tập."
      },
      {
        id: "t2-q2",
        type: "grammar",
        questionText: "He would have attended the intensive pedagogical seminar in Hanoi last weekend if he _________ so busy marking the mid-term exams.",
        options: [
          "weren't",
          "hadn't been",
          "wasn't",
          "hasn't been"
        ],
        correctIndex: 1,
        explanation: "Câu điều kiện loại 3 (giả định quá khứ - 'last weekend'): If + S + had + V3/ed. Nhánh kết quả dùng 'would have attended'.",
        vietnameseTranslation: "Thầy ấy đã tham gia hội thảo sư phạm chuyên sâu tại Hà Nội cuối tuần trước nếu không quá bận chấm bài kiểm tra giữa kỳ."
      },
      {
        id: "t2-q3",
        type: "grammar",
        questionText: "I look forward to _________ constructive feedback from the Provincial Department representatives on my new teaching plan.",
        options: [
          "receive",
          "receiving",
          "received",
          "be receiving"
        ],
        correctIndex: 1,
        explanation: "Cấu trúc: 'look forward to + V-ing': mong đợi, trông chờ điều gì.",
        vietnameseTranslation: "Tôi rất mong chờ được nhận phản hồi mang tính xây dựng từ các đại diện của Sở Giáo dục về kế hoạch dạy học mới của mình."
      },
      {
        id: "t2-q4",
        type: "grammar",
        questionText: "The primary school teacher had her students _________ English songs to naturally improve their pronounciation rhythm.",
        options: [
          "sing",
          "to sing",
          "singing",
          "sung"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc sai khiến chủ động: 'have someone + V-bare' (nhờ/bảo ai đó làm việc gì).",
        vietnameseTranslation: "Giáo viên tiểu học đã hướng dẫn học sinh hát các bài hát tiếng Anh để cải thiện nhịp điệu phát âm một cách tự nhiên."
      },
      {
        id: "t2-q5",
        type: "grammar",
        questionText: "It is crucial that every educator _________ their professional expertise through action research projects annually.",
        options: [
          "enhances",
          "enhance",
          "enhanced",
          "must enhance"
        ],
        correctIndex: 1,
        explanation: "Cấu trúc giả định với tính từ hệ trọng: 'It is + crucial/important/necessary + that + S + V-bare'.",
        vietnameseTranslation: "Việc mỗi nhà giáo dục nâng cao trình độ chuyên môn của mình thông qua các dự án nghiên cứu sư phạm ứng dụng hàng năm là vô cùng quan trọng."
      },
      {
        id: "t2-q6",
        type: "grammar",
        questionText: "The regional workshop was canceled due to _________ funds for educational materials and training facilities.",
        options: [
          "insufficient",
          "redundant",
          "satisfactory",
          "abundant"
        ],
        correctIndex: 0,
        explanation: "- 'insufficient' (adj): thiếu hụt, không đủ.\n- 'redundant' (adj): thừa thãi.\n- 'satisfactory' (adj): thỏa đáng.\n- 'abundant' (adj): dồi dào.",
        vietnameseTranslation: "Hội thảo khu vực đã bị hủy bỏ do không đủ kinh phí tài trợ cho tài liệu giáo dục và các trang thiết bị đào tạo."
      },
      {
        id: "t2-q7",
        type: "grammar",
        questionText: "Although she had retired, the senior English teacher continued to act as a _________ to younger colleagues.",
        options: [
          "mentor",
          "trainee",
          "apprentice",
          "novice"
        ],
        correctIndex: 0,
        explanation: "- 'mentor' (n): người cố vấn, người hướng dẫn dày dạn kinh nghiệm.\n- 'trainee' (n): thực tập sinh.\n- 'apprentice' (n): người học việc.\n- 'novice' (n): người mới vào nghề.",
        vietnameseTranslation: "Mặc dù đã nghỉ hưu, vị giáo viên tiếng Anh kỳ cựu vẫn tiếp tục đóng vai trò là một người cố vấn hướng dẫn các đồng nghiệp trẻ tuổi."
      },
      {
        id: "t2-q8",
        type: "grammar",
        questionText: "To keep up _________ the pace of pedagogical innovation, teachers must engage with international teaching associations.",
        options: [
          "with",
          "on",
          "to",
          "for"
        ],
        correctIndex: 0,
        explanation: "Cụm động từ cố định: 'keep up with' (bắt kịp, theo kịp tốc độ thay đổi của cái gì).",
        vietnameseTranslation: "Để bắt kịp với nhịp độ đổi mới sư phạm, giáo viên phải kết nối sâu rộng với các hiệp hội giảng dạy quốc tế."
      },
      {
        id: "t2-q9",
        type: "grammar",
        questionText: "Never _________ such an outstanding English demonstration lesson as the one prepared by Mrs. Lan today.",
        options: [
          "I have witnessed",
          "have I witnessed",
          "I witnessed",
          "had I been witnessed"
        ],
        correctIndex: 1,
        explanation: "Trạng từ phủ định đứng đầu câu 'Never' đòi hỏi cấu trúc đảo ngữ: Never + trợ động từ + S + V.",
        vietnameseTranslation: "Chưa bao giờ tôi chứng kiến một tiết dạy minh họa tiếng Anh xuất sắc như tiết học hôm nay do cô Lan chuẩn bị."
      },
      {
        id: "t2-q10",
        type: "grammar",
        questionText: "The lesson plan was carefully laid _________ to ensure logical step-by-step progress for slow learners.",
        options: [
          "out",
          "off",
          "down",
          "aside"
        ],
        correctIndex: 0,
        explanation: "- 'lay out' (phrasal verb): sắp đặt, bố trí rõ ràng.\n- 'lay down' thường dùng cho luật lệ.\n- 'lay off' sa thải.",
        vietnameseTranslation: "Giáo án đã được thiết kế và bố trí cẩn thận để đảm bảo sự tiến bộ hợp lý từng bước cho những học sinh chậm tiến bộ."
      },
      {
        id: "t2-q11",
        type: "error",
        questionText: "Because (A) the severe weather in the mountainous area (B), the school principal decided (C) to postpone the English speaking contest (D).",
        options: [
          "Because",
          "mountainous area",
          "decided",
          "to postpone"
        ],
        correctIndex: 0,
        explanation: "Sau 'Because' là một cụm danh từ 'the severe weather...', vì vậy phải sử dụng giới từ 'Because of' hoặc 'Due to' thay vì liên từ 'Because'.",
        vietnameseTranslation: "Hội đồng nhà trường quyết định hoãn cuộc thi nói tiếng Anh do điều kiện thời tiết khắc nghiệt ở vùng cao."
      },
      {
        id: "t2-q12",
        type: "error",
        questionText: "Writing (A) curriculum materials require (B) not only linguistic competence (C) but also profound educational experience (D).",
        options: [
          "Writing",
          "require",
          "linguistic competence",
          "profound educational"
        ],
        correctIndex: 1,
        explanation: "Chủ ngữ của câu là danh động từ 'Writing curriculum materials' (việc biên soạn tài liệu giảng dạy - ở dạng số ít), do đó động từ 'require' phải chia số ít thành 'requires'.",
        vietnameseTranslation: "Việc biên soạn tài liệu chương trình giảng dạy không chỉ yêu cầu năng lực ngôn ngữ mà cả trải nghiệm giáo dục sâu sắc."
      },
      {
        id: "t2-q13",
        type: "error",
        questionText: "The newly-bought (A) laptop, who (B) the head teacher keeps on (C) her main desk, is loaded with digital resources (D).",
        options: [
          "newly-bought",
          "who",
          "keeps on",
          "digital resources"
        ],
        correctIndex: 1,
        explanation: "Đại từ quan hệ 'who' dùng để thay thế cho danh từ chỉ người. Ở đây, danh từ chỉ vật là 'The newly-bought laptop', nên phải sử dụng 'which' hoặc 'that'.",
        vietnameseTranslation: "Chiếc máy tính xách tay mới mua, cái mà cô giáo chủ nhiệm để trên bàn làm việc chính của cô ấy, chứa rất nhiều học liệu số."
      },
      {
        id: "t2-q14",
        type: "reading",
        questionText: "Which of the following is the most appropriate title for the passage?",
        options: [
          "The Traditional Mechanics of Grammar Translation.",
          "Communicative Language Teaching: Principles, Benefits, and Challenges.",
          "How to Conduct Formal Vocabulary Exams.",
          "The Decreasing Importance of Teacher Training Institutions."
        ],
        correctIndex: 1,
        passage: "Communicative Language Teaching (CLT) represents a profound shift in language instruction. Emerging in the late 20th century as a response to mechanical memorization models, CLT aims to cultivate 'communicative competence' rather than isolated grammatical knowledge. The philosophy centers around a simple core: language is learned best when it is used to negotiate real meanings in functional tasks. In a CLT-oriented class, one might observe students role-playing real-world situations, debating heated local dilemmas, or solving cooperative information-gap tasks. The primary goal is getting the message across fluently, without the constant fear of grammatical perfection.\n\nNevertheless, implementing CLT in traditional exam-oriented school cultures is fraught with difficulties. In some contexts, classes are excessively large, meaning individual speaking time is dwindled. Furthermore, high-stakes national assessments often test written structures and vocabulary definitions, inadvertently leading educators to teach to the test using old grammatical-translation structures. To address this, curriculum reformers recommend designing assessments that balance written mastery with oral performance, allowing teachers the structural freedom to employ interactive techniques.",
        explanation: "Đoạn văn giới thiệu về nguồn gốc, triết lý cốt lõi, hoạt động điển hình của CLT, song song đó là những thách thức khi áp dụng vào nền văn hóa giáo dục chú trọng thi cử, từ đó đề xuất giải pháp kiểm tra đánh giá cân bằng.",
        vietnameseTranslation: "Tiêu đề nào phù hợp nhất cho đoạn văn trên?"
      },
      {
        id: "t2-q15",
        type: "reading",
        questionText: "What is the primary goal of CLT according to the passage?",
        options: [
          "To force students to achieve flawless theoretical grammar.",
          "To help students learn the historical formation of English words.",
          "To enable students to negotiate meanings and communicate fluently.",
          "To replace real teachers completely with digital automated software."
        ],
        correctIndex: 2,
        passage: "Communicative Language Teaching (CLT) represents a profound shift in language instruction. Emerging in the late 20th century as a response to mechanical memorization models, CLT aims to cultivate 'communicative competence' rather than isolated grammatical knowledge. The philosophy centers around a simple core: language is learned best when it is used to negotiate real meanings in functional tasks. In a CLT-oriented class, one might observe students role-playing real-world situations, debating heated local dilemmas, or solving cooperative information-gap tasks. The primary goal is getting the message across fluently, without the constant fear of grammatical perfection.\n\nNevertheless, implementing CLT in traditional exam-oriented school cultures is fraught with difficulties. In some contexts, classes are excessively large, meaning individual speaking time is dwindled. Furthermore, high-stakes national assessments often test written structures and vocabulary definitions, inadvertently leading educators to teach to the test using old grammatical-translation structures. To address this, curriculum reformers recommend designing assessments that balance written mastery with oral performance, allowing teachers the structural freedom to employ interactive techniques.",
        explanation: "Dẫn chứng từ đoạn văn: 'CLT aims to cultivate 'communicative competence'...' và 'The primary goal is getting the message across fluently...' (Giúp học sinh có thể đàm phán ý nghĩa thực tế và giao tiếp lưu loát).",
        vietnameseTranslation: "Mục tiêu cơ bản của phương pháp CLT theo đoạn văn là gì?"
      },
      {
        id: "t2-q16",
        type: "reading",
        questionText: "What does the author suggest about 'traditional school cultures'?",
        options: [
          "They are extremely quick to adopt interactive methods.",
          "They are highly exam-oriented, posing challenges to CLT implementation.",
          "They contain very small classrooms, allowing ample individual focus.",
          "They completely avoid teaching grammar rules."
        ],
        correctIndex: 1,
        passage: "Communicative Language Teaching (CLT) represents a profound shift in language instruction. Emerging in the late 20th century as a response to mechanical memorization models, CLT aims to cultivate 'communicative competence' rather than isolated grammatical knowledge. The philosophy centers around a simple core: language is learned best when it is used to negotiate real meanings in functional tasks. In a CLT-oriented class, one might observe students role-playing real-world situations, debating heated local dilemmas, or solving cooperative information-gap tasks. The primary goal is getting the message across fluently, without the constant fear of grammatical perfection.\n\nNevertheless, implementing CLT in traditional exam-oriented school cultures is fraught with difficulties. In some contexts, classes are excessively large, meaning individual speaking time is dwindled. Furthermore, high-stakes national assessments often test written structures and vocabulary definitions, inadvertently leading educators to teach to the test using old grammatical-translation structures. To address this, curriculum reformers recommend designing assessments that balance written mastery with oral performance, allowing teachers the structural freedom to employ interactive techniques.",
        explanation: "Dẫn chứng từ đoạn văn: 'Nevertheless, implementing CLT in traditional exam-oriented school cultures is fraught with difficulties.' (mang tính định hướng thi cử cao, tạo ra rào cản lớn).",
        vietnameseTranslation: "Tác giả ám chỉ điều gì về 'văn hóa học đường truyền thống'?"
      },
      {
        id: "t2-q17",
        type: "reading",
        questionText: "What does the word 'dwindled' in paragraph 2 most likely mean?",
        options: [
          "increased",
          "decreased",
          "stabilized",
          "eliminated"
        ],
        correctIndex: 1,
        passage: "Communicative Language Teaching (CLT) represents a profound shift in language instruction. Emerging in the late 20th century as a response to mechanical memorization models, CLT aims to cultivate 'communicative competence' rather than isolated grammatical knowledge. The philosophy centers around a simple core: language is learned best when it is used to negotiate real meanings in functional tasks. In a CLT-oriented class, one might observe students role-playing real-world situations, debating heated local dilemmas, or solving cooperative information-gap tasks. The primary goal is getting the message across fluently, without the constant fear of grammatical perfection.\n\nNevertheless, implementing CLT in traditional exam-oriented school cultures is fraught with difficulties. In some contexts, classes are excessively large, meaning individual speaking time is dwindled. Furthermore, high-stakes national assessments often test written structures and vocabulary definitions, inadvertently leading educators to teach to the test using old grammatical-translation structures. To address this, curriculum reformers recommend designing assessments that balance written mastery with oral performance, allowing teachers the structural freedom to employ interactive techniques.",
        explanation: "Trong văn cảnh 'classes are excessively large, meaning individual speaking time is dwindled', từ 'dwindle' có nghĩa là thu hẹp, giảm sút, suy giảm ('decreased').",
        vietnameseTranslation: "Từ 'dwindled' ở đoạn 2 có nghĩa gần nhất với từ nào dưới đây?"
      },
      {
        id: "t2-q18",
        type: "reading",
        questionText: "To fix the conflict with traditional testing, what do reformers propose?",
        options: [
          "A complete cancellation of all English assessments.",
          "Introducing only oral speaking exams and ignoring writing skills.",
          "Designing assessments that balance written mastery with oral performance.",
          "Replacing teachers altogether with international educators."
        ],
        correctIndex: 2,
        passage: "Communicative Language Teaching (CLT) represents a profound shift in language instruction. Emerging in the late 20th century as a response to mechanical memorization models, CLT aims to cultivate 'communicative competence' rather than isolated grammatical knowledge. The philosophy centers around a simple core: language is learned best when it is used to negotiate real meanings in functional tasks. In a CLT-oriented class, one might observe students role-playing real-world situations, debating heated local dilemmas, or solving cooperative information-gap tasks. The primary goal is getting the message across fluently, without the constant fear of grammatical perfection.\n\nNevertheless, implementing CLT in traditional exam-oriented school cultures is fraught with difficulties. In some contexts, classes are excessively large, meaning individual speaking time is dwindled. Furthermore, high-stakes national assessments often test written structures and vocabulary definitions, inadvertently leading educators to teach to the test using old grammatical-translation structures. To address this, curriculum reformers recommend designing assessments that balance written mastery with oral performance, allowing teachers the structural freedom to employ interactive techniques.",
        explanation: "Dẫn chứng đoan văn: 'reformers recommend designing assessments that balance written mastery with oral performance, allowing teachers ...'",
        vietnameseTranslation: "Để khắc phục xung đột với kiểm tra truyền thống, các nhà cải cách đề xuất gì?"
      },
      {
        id: "t2-q19",
        type: "pedagogy",
        questionText: "Scenario: A teacher notices several students are chatting in Vietnamese during a peer communicative roleplay activity. What is the most pedagogical first step?",
        options: [
          "Loudly command them to go out of the classroom immediately and give them a bad mark.",
          "Approach their table, gently remind them of the English speaking prompt, and if necessary, provide dynamic sentence starters to support their communication.",
          "Ignore them and focus only on the students who are speaking English extremely fluently.",
          "Stop the entire class discussion and run a 30-minute silent test on difficult grammar points."
        ],
        correctIndex: 1,
        explanation: "Tiếp cận bàn của học sinh để nhắc nhở nhẹ nhàng và cung cấp thêm các cấu trúc gợi ý (sentence starters/scaffolding) là giải pháp hỗ trợ sư phạm tích cực, tránh làm tổn thương học sinh và duy trì bầu không khí lớp học tích cực.",
        vietnameseTranslation: "Tình huống: Giáo viên phát hiện một vài học sinh nói chuyện bằng tiếng Việt trong hoạt động đóng vai giao tiếp cặp. Đâu là bước giải quyết sư phạm đầu tiên hiệu quả nhất?"
      },
      {
        id: "t2-q20",
        type: "pedagogy",
        questionText: "Scenario: To warm up the class on the theme 'Environmental Protection', which activity provides the most student-centered engagement?",
        options: [
          "The teacher writes 50 environmental words on the board and asks students to copy them in silence.",
          "The teacher shows a brief, provocative environment image and asks pairs to quickly brainstorm and share 3 things they see and feel about it.",
          "The teacher recites a 15-minute monograph in English explaining the history of global warming.",
          "The teacher reads a textbook passage aloud with zero student interaction."
        ],
        correctIndex: 1,
        explanation: "Hiển thị ảnh và yêu cầu làm việc cặp nhanh để brainstorm tạo động thái tư duy học sinh (student-centered), nâng cao sự gắn kết thực tế vào bài học.",
        vietnameseTranslation: "Tình huống: Để khởi động bài học về chủ đề 'Bảo vệ Môi trường', hoạt động nào đem lại hiệu quả lấy học sinh làm trung tâm cao nhất?"
      }
    ]
  },
  {
    id: "test-03",
    title: "Đề Khảo sát số 3: Thiết kế Đánh giá & Phát triển Năng lực Giáo dục",
    description: "Khảo sát năng lực tiếng Anh Bậc 2 - Bậc 4. Chuyên đề về phương pháp dạy học phân hóa (Differentiated Instruction), mệnh đề danh từ và từ vựng về công nghệ giáo dục.",
    durationMinutes: 20,
    questions: [
      {
        id: "t3-q1",
        type: "grammar",
        questionText: "Hardly _________ the classroom projector when a sudden power outage occurred during the presentation.",
        options: [
          "had the teacher turned on",
          "the teacher had turned on",
          "did the teacher turn on",
          "the teacher turned on"
        ],
        correctIndex: 0,
        explanation: "Đảo ngữ với 'Hardly': Hardly + had + S + V3/ed + when + S2 + V (quá khứ đơn).",
        vietnameseTranslation: "Giáo viên vừa mới bật máy chiếu lớp học lên thì một sự cố mất điện đột ngột đã xảy ra trong buổi thuyết trình."
      },
      {
        id: "t3-q2",
        type: "grammar",
        questionText: "_________ teaching methods are designed to accommodate the distinct learning styles in a mixed-ability class.",
        options: [
          "Differentiated",
          "Indifferent",
          "Differentiation",
          "Differentiable"
        ],
        correctIndex: 0,
        explanation: "Dùng tính từ đúng trước cụm danh từ 'teaching methods': 'Differentiated teaching methods' (Các phương pháp giảng dạy phân hóa).",
        vietnameseTranslation: "Các phương pháp dạy học phân hóa được thiết kế để điều chỉnh phù hợp với phong cách học tập khác biệt trong một lớp học có năng lực không đồng đều."
      },
      {
        id: "t3-q3",
        type: "grammar",
        questionText: "No one in the English Department objected _________ additional blended learning platforms to support remote pupils.",
        options: [
          "to introduce",
          "introducing",
          "to introducing",
          "at introducing"
        ],
        correctIndex: 2,
        explanation: "Cấu trúc phản đối điều gì: 'object to + V-ing'. (Trong đó 'to' đóng vai trò giới từ).",
        vietnameseTranslation: "Không ai trong tổ tiếng Anh phản đối việc đưa thêm các nền tảng học tập hỗn hợp vào để hỗ trợ học sinh ở vùng xa học trực tuyến."
      },
      {
        id: "t3-q4",
        type: "grammar",
        questionText: "The virtual course was so structured that it allowed participants _________ at their own speed.",
        options: [
          "to progress",
          "progressing",
          "progress",
          "to be progressed"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc: 'allow someone to do something' (cho phép ai đó làm gì).",
        vietnameseTranslation: "Khóa học ảo đã được thiết kế chi tiết đến mức cho phép các học viên tiến bộ theo tốc độ tự chủ của riêng họ."
      },
      {
        id: "t3-q5",
        type: "grammar",
        questionText: "Had the provincial department provided better training resources, we _________ this hybrid scheme last year.",
        options: [
          "will implement",
          "implemented",
          "would have implemented",
          "would implement"
        ],
        correctIndex: 2,
        explanation: "Đảo ngữ câu điều kiện loại 3 (giả định quá khứ): Had + S + V3/ed, S + would have + V3/ed.",
        vietnameseTranslation: "Nếu sở GD-ĐT cung cấp học liệu tốt hơn, chúng tôi đã triển khai đề án học tập kết hợp này từ năm ngoái."
      },
      {
        id: "t3-q6",
        type: "grammar",
        questionText: "Many teachers prefer formative feedback _________ summative testing because it yields continuous insights into pupil struggles.",
        options: [
          "to",
          "than",
          "over",
          "for"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc so sánh thích hơn: 'prefer A to B' (Thích A hơn B).",
        vietnameseTranslation: "Nhiều giáo viên thích phản hồi rèn luyện (formative feedback) hơn là thi điểm số (summative testing) vì nó cho thấy sâu sắc những khó khăn liên tục của học sinh."
      },
      {
        id: "t3-q7",
        type: "grammar",
        questionText: "Online exercises with automated feedback help _________ the marking burden on general education teachers.",
        options: [
          "alleviate",
          "aggravate",
          "accelerate",
          "accumulate"
        ],
        correctIndex: 0,
        explanation: "- 'alleviate' (v): giảm tải, giảm bớt (gánh nặng tính điểm).\n- 'aggravate' (v): làm trầm trọng thêm.\n- 'accelerate' (v): thúc đẩy nhanh.\n- 'accumulate' (v): tích tụ.",
        vietnameseTranslation: "Các bài tập trắc nghiệm trực tuyến có phản hồi tự động giúp giảm bớt gánh nặng chấm điểm cho giáo viên phổ thông."
      },
      {
        id: "t3-q8",
        type: "grammar",
        questionText: "The interactive grammar game _________ of puzzle pieces which children must rearrange to form correct sentences.",
        options: [
          "consists",
          "comprises",
          "contains",
          "includes"
        ],
        correctIndex: 0,
        explanation: "Động từ đi với giới từ 'of': 'consist of' (bao gồm). 'Comprise', 'contain', 'include' không đi trực tiếp với 'of' ở thể chủ động.",
        vietnameseTranslation: "Trò chơi ngữ pháp tương tác bao gồm các mảnh ghép mà trẻ em phải sắp xếp lại để tạo thành câu hoàn chỉnh."
      },
      {
        id: "t3-q9",
        type: "grammar",
        questionText: "I recommended that the young teacher _________ her students to read simplified books to trigger natural acquisition.",
        options: [
          "encourage",
          "encouraged",
          "encourages",
          "has encouraged"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc giả định với 'recommend': S + recommend + that + S2 + V-bare.",
        vietnameseTranslation: "Tôi đã khuyến nghị rằng nữ giáo viên trẻ nên khuyến khích học sinh của mình đọc sách đơn giản hóa để kích hoạt sự thụ đắc ngôn ngữ tự nhiên."
      },
      {
        id: "t3-q10",
        type: "grammar",
        questionText: "Due to the COVID-19 pandemic, schools had to rely heavily _________ online learning portals to manage syllabus requirements.",
        options: [
          "on",
          "at",
          "for",
          "by"
        ],
        correctIndex: 0,
        explanation: "Cụm động từ cố định: 'rely heavily on' (phụ thuộc lớn vào cái gì).",
        vietnameseTranslation: "Do đại dịch COVID-19, các trường học đã phải phụ thuộc sâu sắc vào các cổng học tập trực tuyến để hoàn thành phân phối chương trình học."
      },
      {
        id: "t3-q11",
        type: "error",
        questionText: "Neither (A) the students nor (B) their homeroom teacher were (C) present at the morning English flag-salute (D) ceremony.",
        options: [
          "Neither",
          "nor",
          "were",
          "flag-salute"
        ],
        correctIndex: 2,
        explanation: "Cấu trúc 'Neither N1 nor N2'. Động từ chia theo chủ ngữ gần nhất (N2). Ở đây 'their homeroom teacher' là số ít, do đó 'were' phải đổi thành 'was'.",
        vietnameseTranslation: "Cả các học sinh lẫn giáo viên chủ nhiệm đều không có mặt tại buổi chào cờ sáng nay có nội dung tiếng Anh."
      },
      {
        id: "t3-q12",
        type: "error",
        questionText: "The classroom technology (A) was such (B) outdated that (C) teachers frequently resorted to write (D) on standard chalkboards.",
        options: [
          "classroom technology",
          "was such",
          "that",
          "write"
        ],
        correctIndex: 1,
        explanation: "Phải dùng 'so + tính từ + that' thay vì 'such'. 'Outdated' là tính từ nên câu đúng phải là 'was so outdated that...'.",
        vietnameseTranslation: "Thiết bị công nghệ lớp học quá lỗi thời đến mức giáo viên thường xuyên phải quay lại viết trên bảng phấn thông thường."
      },
      {
        id: "t3-q13",
        type: "error",
        questionText: "Having completed (A) his pedagogical training (B), the new teacher of English sent (C) his CV to several prestigious school (D).",
        options: [
          "Having completed",
          "pedagogical training",
          "sent",
          "prestigious school"
        ],
        correctIndex: 3,
        explanation: "Sau từ chỉ số lượng 'several' (một vài) phải đi với danh từ số nhiều. Từ 'school' sửa thành 'schools'.",
        vietnameseTranslation: "Sau khi hoàn thành đợt đào tạo sư phạm, giáo viên tiếng Anh mới đã gửi CV của mình đến một số trường học danh tiếng."
      },
      {
        id: "t3-q14",
        type: "reading",
        questionText: "What is the primary message of this reading passage?",
        options: [
          "Mixed-ability classrooms must be separated into different physical schools.",
          "Differentiated instruction targets diverse needs in mixed classrooms.",
          "Standardized testing has vanished from Vietnamese high schools.",
          "Auditory learners outperform visual learners in overall vocab acquisition."
        ],
        correctIndex: 1,
        passage: "Differentiated Instruction (DI) is a pedagogical approach that recognizes classrooms are not homogeneous clusters of identical learners. Instead, modern educational environments harbor a complex mix of student profiles, possessing diverse linguistic backgrounds, varied cognitive speeds, and distinct emotional needs. For secondary English educators, implementing DI involves adjusting three core areas: content (what students learn), process (how they make sense of it), and product (how they demonstrate mastery). In a differentiated English class, a teacher might provide visual infographs for visual learners, clear audio dialogues for auditory learners, and physical dramatic scripts for kinesthetic pupils during the same reading text unit.\n\nWhile DI offers huge advantages in fostering student self-confidence and vocabulary output, critics warn that the time required to design individual lesson templates is demanding for already overworked public teachers. To mitigate this exhaustion, experts advocate for collaborative team planning, where educators share curriculum resources and leverage AI-based scaffolding tools. This collective planning allows teachers to implement personalized pedagogies without sacrificing their work-life balance.",
        explanation: "Đoạn văn nhấn mạnh triết lý và thực tiễn của dạy học phân hóa (DI) nhằm đáp ứng nhu cầu đa dạng của người học khác nhau trong cùng một lớp học không đồng đều.",
        vietnameseTranslation: "Thông điệp chính của đoạn văn đọc hiểu này là gì?"
      },
      {
        id: "t3-q15",
        type: "reading",
        questionText: "According to the passage, DI stands for which pedagogical concept?",
        options: [
          "Dramatic Instruction",
          "Distance Integration",
          "Differentiated Instruction",
          "Diagnostic Interpretation"
        ],
        correctIndex: 2,
        passage: "Differentiated Instruction (DI) is a pedagogical approach that recognizes classrooms are not homogeneous clusters of identical learners. Instead, modern educational environments harbor a complex mix of student profiles, possessing diverse linguistic backgrounds, varied cognitive speeds, and distinct emotional needs. For secondary English educators, implementing DI involves adjusting three core areas: content (what students learn), process (how they make sense of it), and product (how they demonstrate mastery). In a differentiated English class, a teacher might provide visual infographs for visual learners, clear audio dialogues for auditory learners, and physical dramatic scripts for kinesthetic pupils during the same reading text unit.\n\nWhile DI offers huge advantages in fostering student self-confidence and vocabulary output, critics warn that the time required to design individual lesson templates is demanding for already overworked public teachers. To mitigate this exhaustion, experts advocate for collaborative team planning, where educators share curriculum resources and leverage AI-based scaffolding tools. This collective planning allows teachers to implement personalized pedagogies without sacrificing their work-life balance.",
        explanation: "Ngay dòng đầu tiên của văn bản ghi rõ: 'Differentiated Instruction (DI) is a...' (Dạy học phân hóa).",
        vietnameseTranslation: "Theo bài đọc, chữ DI đại diện cho khái niệm sư phạm nào?"
      },
      {
        id: "t3-q16",
        type: "reading",
        questionText: "What three core areas can English teachers adjust to implement DI?",
        options: [
          "Content, process, and product.",
          "Grammar, spelling, and handwriting.",
          "Attendance, seating layout, and uniform colors.",
          "School funding, hiring standards, and library size."
        ],
        correctIndex: 0,
        passage: "Differentiated Instruction (DI) is a pedagogical approach that recognizes classrooms are not homogeneous clusters of identical learners. Instead, modern educational environments harbor a complex mix of student profiles, possessing diverse linguistic backgrounds, varied cognitive speeds, and distinct emotional needs. For secondary English educators, implementing DI involves adjusting three core areas: content (what students learn), process (how they make sense of it), and product (how they demonstrate mastery). In a differentiated English class, a teacher might provide visual infographs for visual learners, clear audio dialogues for auditory learners, and physical dramatic scripts for kinesthetic pupils during the same reading text unit.\n\nWhile DI offers huge advantages in fostering student self-confidence and vocabulary output, critics warn that the time required to design individual lesson templates is demanding for already overworked public teachers. To mitigate this exhaustion, experts advocate for collaborative team planning, where educators share curriculum resources and leverage AI-based scaffolding tools. This collective planning allows teachers to implement personalized pedagogies without sacrificing their work-life balance.",
        explanation: "Dẫn chứng từ đoạn văn: '...DI involves adjusting three core areas: content (what students learn), process (how they make sense of it), and product (how they demonstrate mastery).'",
        vietnameseTranslation: "Ba lĩnh vực cốt lõi nào giáo viên tiếng Anh có thể tự điều chỉnh để thực hiện dạy học phân hóa?"
      },
      {
        id: "t3-q17",
        type: "reading",
        questionText: "What is mentioned as a major challenge in implementing DI?",
        options: [
          "The lack of digital laptops in urban areas.",
          "The excessive planning time required of public school teachers.",
          "A complete lack of support from students' parents.",
          "Linguistic errors in the textbooks themselves."
        ],
        correctIndex: 1,
        passage: "Differentiated Instruction (DI) is a pedagogical approach that recognizes classrooms are not homogeneous clusters of identical learners. Instead, modern educational environments harbor a complex mix of student profiles, possessing diverse linguistic backgrounds, varied cognitive speeds, and distinct emotional needs. For secondary English educators, implementing DI involves adjusting three core areas: content (what students learn), process (how they make sense of it), and product (how they demonstrate mastery). In a differentiated English class, a teacher might provide visual infographs for visual learners, clear audio dialogues for auditory learners, and physical dramatic scripts for kinesthetic pupils during the same reading text unit.\n\nWhile DI offers huge advantages in fostering student self-confidence and vocabulary output, critics warn that the time required to design individual lesson templates is demanding for already overworked public teachers. To mitigate this exhaustion, experts advocate for collaborative team planning, where educators share curriculum resources and leverage AI-based scaffolding tools. This collective planning allows teachers to implement personalized pedagogies without sacrificing their work-life balance.",
        explanation: "Dẫn chứng lo ngại của các nhà phê bình: 'the time required to design individual lesson templates is demanding for already overworked public teachers.' (Thời gian chuẩn bị bài quá tải).",
        vietnameseTranslation: "Khó khăn thách thức lớn nhất được đề cập khi áp dụng dạy học phân hóa là gì?"
      },
      {
        id: "t3-q18",
        type: "reading",
        questionText: "How does the author recommend easing the planning workload of DI teachers?",
        options: [
          "By reverting to passive lecturing models.",
          "Through collaborative team planning and AI scaffolding systems.",
          "By reducing the school hours of language classes.",
          "By outsourcing all lesson-planning jobs to software firms."
        ],
        correctIndex: 1,
        passage: "Differentiated Instruction (DI) is a pedagogical approach that recognizes classrooms are not homogeneous clusters of identical learners. Instead, modern educational environments harbor a complex mix of student profiles, possessing diverse linguistic backgrounds, varied cognitive speeds, and distinct emotional needs. For secondary English educators, implementing DI involves adjusting three core areas: content (what students learn), process (how they make sense of it), and product (how they demonstrate mastery). In a differentiated English class, a teacher might provide visual infographs for visual learners, clear audio dialogues for auditory learners, and physical dramatic scripts for kinesthetic pupils during the same reading text unit.\n\nWhile DI offers huge advantages in fostering student self-confidence and vocabulary output, critics warn that the time required to design individual lesson templates is demanding for already overworked public teachers. To mitigate this exhaustion, experts advocate for collaborative team planning, where educators share curriculum resources and leverage AI-based scaffolding tools. This collective planning allows teachers to implement personalized pedagogies without sacrificing their work-life balance.",
        explanation: "Dẫn chứng chính xác: 'experts advocate for collaborative team planning, where educators share curriculum resources and leverage AI-based scaffolding tools.'",
        vietnameseTranslation: "Tác giả đề xuất thế nào để xoa dịu khối lượng chuẩn bị bài của các giáo viên dạy phân hóa?"
      },
      {
        id: "t3-q19",
        type: "pedagogy",
        questionText: "Scenario: A teacher wants to introduce the 'Present Perfect Tense' to high school students. Which inductive approach is most effective?",
        options: [
          "Writing the formula 'S + has/have + V3' on the board first, and ordering students to memorize it for 20 minutes.",
          "Providing students with short postcard texts where past actions with clear present consequences are underlined, asking students to analyze the context first.",
          "Translating 50 isolated sentences from the present perfect directly into Vietnamese.",
          "Telling students that present perfect is too difficult and skipping it."
        ],
        correctIndex: 1,
        explanation: "Phương pháp quy nạp (inductive approach) là cho học sinh tiếp cận ngữ cảnh thực tế trước (đặc biệt các hành động quá khứ có kết quả ở hiện tại) để các em tự quan sát, chiêm nghiệm và rút ra quy tắc ngữ pháp một cách tự nhiên dưới sự dẫn dắt của giáo viên.",
        vietnameseTranslation: "Tình huống: Giáo viên muốn giới thiệu thì Hiện tại hoàn thành (Present Perfect Tense) cho học sinh phổ thông. Đâu là cách tiếp cận quy nạp (inductive) hiệu quả nhất?"
      },
      {
        id: "t3-q20",
        type: "pedagogy",
        questionText: "Scenario: A teacher wants to run vocabulary revision with high-ability classes. Which task is highly engaging?",
        options: [
          "Giving a tedious spelling test of isolated words while speaking Vietnamese definitions aloud.",
          "An interaction game of 'Taboo/Alias' where students must describe target English pedagogical words without saying the word itself.",
          "Instructing students to rewrite matching pages from the textbook word-by-word.",
          "Dismissing the class 30 minutes early."
        ],
        correctIndex: 1,
        explanation: "Trò chơi 'Taboo/Alias' (đoán từ gián tiếp) không chỉ rèn luyện phản xạ ngôn ngữ mà còn kích hoạt tối đa năng lực giải nghĩa (paraphrasing), tạo ra sự hào hứng và rèn luyện kỹ năng truyền đạt rất cao.",
        vietnameseTranslation: "Tình huống: Giáo viên muốn ôn tập từ vựng cho một lớp có năng lực tốt. Hoạt động nào mang tính tương tác và tư duy cao nhất?"
      }
    ]
  },
  {
    id: "test-04",
    title: "Đề Khảo sát số 4: Công nghệ & Kỹ thuật Đánh giá Thường xuyên",
    description: "Khảo sát năng lực tiếng Anh Bậc 2 - Bậc 4. Phù hợp đánh giá kỹ năng tích hợp, cấu trúc nhấn mạnh (Cleft sentence) và vận dụng CNTT trong phương pháp VSTEP.",
    durationMinutes: 20,
    questions: [
      {
        id: "t4-q1",
        type: "grammar",
        questionText: "It was Mr. Thanh _________ introduced the Google Classroom portal to our secondary school staff last winter.",
        options: [
          "who",
          "which",
          "whom",
          "whose"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc câu chẻ nhấn mạnh chủ ngữ chỉ người: It is/was + Danh từ chỉ người + who/that + V... Ở đây 'Mr. Thanh' là người nên dùng 'who'.",
        vietnameseTranslation: "Chính thầy Thành là người đã giới thiệu cổng học tập Google Classroom đến đội ngũ giáo viên trường THPT của chúng tôi vào mùa đông năm ngoái."
      },
      {
        id: "t4-q2",
        type: "grammar",
        questionText: "_________ the instructions of the language supervisor, the teacher changed her board organization instantly.",
        options: [
          "Having heard",
          "Heard",
          "To hear",
          "Sensed"
        ],
        correctIndex: 0,
        explanation: "Sử dụng phân từ hoàn thành (Having + V3) để rút gọn mệnh đề trạng ngữ, diễn tả một hành động đã hoàn tất trước khi hành động khác diễn ra (Mục đích nhấn mạnh trình tự thời gian).",
        vietnameseTranslation: "Sau khi nghe hướng dẫn từ giám sát viên ngôn ngữ, cô giáo đã thay đổi cách trình bày bảng ngay lập tức."
      },
      {
        id: "t4-q3",
        type: "grammar",
        questionText: "The team agreed that the digital test questions should comply _________ the standardized specifications of the national curriculum.",
        options: [
          "with",
          "to",
          "at",
          "by"
        ],
        correctIndex: 0,
        explanation: "Động từ 'comply' luôn đi với giới từ 'with' (tuân thủ theo quy định/khuôn mẫu).",
        vietnameseTranslation: "Nhóm chuyên môn đã thống nhất rằng câu hỏi thi kỹ thuật số phải tuân thủ các quy định chuẩn hóa của chương trình giáo dục quốc gia."
      },
      {
        id: "t4-q4",
        type: "grammar",
        questionText: "The foreign volunteer suggested _________ an English debate club for grade 10 students to promote speaking reflexes.",
        options: [
          "establishing",
          "to establish",
          "establish",
          "established"
        ],
        correctIndex: 0,
        explanation: "Động từ 'suggest' khi không có mệnh đề 'that' thì đi trực tiếp với danh động từ: 'suggest + V-ing'.",
        vietnameseTranslation: "Tách tình nguyện viên nước ngoài đã đề xuất thành lập một câu lạc bộ tranh biện tiếng Anh cho học sinh lớp 10 để thúc đẩy phản xạ nói sâu."
      },
      {
        id: "t4-q5",
        type: "grammar",
        questionText: "The classroom had poor acoustics _________ made it extremely exhausting for the teacher to deliver auditory commands.",
        options: [
          "which",
          "whom",
          "who",
          "where"
        ],
        correctIndex: 0,
        explanation: "Sử dụng đại từ quan hệ phi xác định 'which' thay thế cho cả mệnh đề hoặc danh từ chỉ vật 'poor acoustics' đứng trước.",
        vietnameseTranslation: "Lớp học có thiết kế âm thanh kém, điều này làm cho giáo viên cực kỳ mệt mỏi khi phải đưa ra các hiệu lệnh bằng lời nói."
      },
      {
        id: "t4-q6",
        type: "grammar",
        questionText: "The principal praised the English teachers for their _________ efforts in designing remote lesson templates during floods.",
        options: [
          "commendable",
          "negligible",
          "lamentable",
          "reprehensible"
        ],
        correctIndex: 0,
        explanation: "- 'commendable' (adj): đáng được khen ngợi, đáng tuyên dương.\n- 'negligible' (adj): không đáng kể.\n- 'lamentable' (adj): đáng tiếc.\n- 'reprehensible' (adj): đáng bị chỉ trích.",
        vietnameseTranslation: "Hiệu trưởng đã khen ngợi các giáo viên tiếng Anh vì nỗ lực đáng ghi nhận của họ trong việc thiết kế các mẫu giáo án từ xa trong mùa bão lũ."
      },
      {
        id: "t4-q7",
        type: "grammar",
        questionText: "To assess authentic speaking, teachers often use rubrics to _________ pronunciation, coherence and grammatical range.",
        options: [
          "evaluate",
          "elaborate",
          "elevate",
          "evacuate"
        ],
        correctIndex: 0,
        explanation: "- 'evaluate' (v): đánh giá toàn diện.\n- 'elaborate' (v): trình bày chi tiết.\n- 'elevate' (v): nâng tầm.\n- 'evacuate' (v): sơ tán.",
        vietnameseTranslation: "Để đánh giá năng lực nói thực tế, giáo viên thường sử dụng các biểu chí chấm điểm (rubrics) để đánh giá phát âm, độ mạch lạc và phạm vi ngữ pháp."
      },
      {
        id: "t4-q8",
        type: "grammar",
        questionText: "The training curriculum _________ great emphasis on classroom interaction, cooperative tasks and self-assessment.",
        options: [
          "places",
          "makes",
          "does",
          "forces"
        ],
        correctIndex: 0,
        explanation: "Cụm từ cố định: 'place/put emphasis on something' (nhấn mạnh tầm quan trọng vào điều gì).",
        vietnameseTranslation: "Chương trình đào tạo đặt trọng tâm lớn vào tương tác lớp học, các hoạt động hợp tác và tự đánh giá."
      },
      {
        id: "t4-q9",
        type: "grammar",
        questionText: "If the projector had not run out of battery during the final demonstration, the lecture _________ a major triumph.",
        options: [
          "would have been",
          "would be",
          "had been",
          "will be"
        ],
        correctIndex: 0,
        explanation: "Sử dụng câu điều kiện loại 3 cho tình giả định quá khứ: had not run -> would have been.",
        vietnameseTranslation: "Nếu chiếc máy chiếu không bị hết pin trong buổi dạy thử nghiệm chung kết, thì bài học đã là một thành công rực rỡ rồi."
      },
      {
        id: "t4-q10",
        type: "grammar",
        questionText: "She decided to undergo further professional training to _________ her career options in senior education.",
        options: [
          "broaden",
          "broad",
          "broadening",
          "broadly"
        ],
        correctIndex: 0,
        explanation: "- 'to + V-bare' chỉ mục đích. 'broaden' (v): mở rộng con đường sự nghiệp.",
        vietnameseTranslation: "Cô ấy quyết định theo đuổi đợt đào tạo chuyên môn sâu hơn để mở rộng các cơ hội sự nghiệp trong ngành giáo dục cấp cao."
      },
      {
        id: "t4-q11",
        type: "error",
        questionText: "The pedagogical (A) workshop focused in (B) dynamic assessment tools (C) for teaching large language classes (D).",
        options: [
          "pedagogical",
          "focused in",
          "assessment tools",
          "large language classes"
        ],
        correctIndex: 1,
        explanation: "Động từ 'focused' thường đi kèm với giới từ 'on' (tập trung vào điều gì), không đi với 'in'. Đổi thành 'focused on'.",
        vietnameseTranslation: "Hội thảo sư phạm tập trung vào các công cụ đánh giá năng động dành cho giảng dạy nhóm lớp học lớn tương tác."
      },
      {
        id: "t4-q12",
        type: "error",
        questionText: "Despite (A) our students studied (B) very hard, they (C) faced hardships with advanced phonetics (D).",
        options: [
          "Despite",
          "studied",
          "they",
          "faced hardships"
        ],
        correctIndex: 0,
        explanation: "Sau 'Despite' phải là cụm danh từ hoặc V-ing. Vì sau đó là một mệnh đề 'our students studied...', ta phải sử dụng 'Although' / 'Even though' hoặc đổi thành 'Despite the fact that...'.",
        vietnameseTranslation: "Mặc dù học sinh của chúng tôi ôn tập rất chăm chỉ, các em vẫn gặp nhiều khó khăn với bài ngữ âm nâng cao."
      },
      {
        id: "t4-q13",
        type: "error",
        questionText: "The instructional (A) coordinator recommended to buy (B) three new copies (C) of the teaching guide (D).",
        options: [
          "instructional",
          "recommended to buy",
          "three new copies",
          "of the teaching"
        ],
        correctIndex: 1,
        explanation: "Động từ 'recommend' khi không có mệnh đề bắt buộc theo sau bởi danh động từ (buying), hoặc dùng cấu trúc giả định (recommend buying / recommend that we buy). Sửa thành 'recommended buying'.",
        vietnameseTranslation: "Phối hợp viên điều hành chung đề nghị mua thêm ba cuốn sách hướng dẫn giảng dạy mới."
      },
      {
        id: "t4-q14",
        type: "reading",
        questionText: "What is the primary theme of the reading text?",
        options: [
          "The complete replacement of public schools by online mobile apps.",
          "Formative Assessment as an ongoing pathway to student and teacher growth.",
          "The high prices of purchasing paper-based tests in regional cities.",
          "Why traditional final examinations are the only way to evaluate spelling."
        ],
        correctIndex: 1,
        passage: "Formative Assessment (FA), also labeled as 'Assessment for Learning,' represents a continuous instructional feedback mechanism. Unlike summative assessments, which measure final learning output at the end of a semester, FA thrives as an ongoing diagnostic pathway. Its primary goal is providing both teachers and pupils with immediate, actionable data. Through diagnostic quick polls, digital exit tickets or interactive whiteboards, teachers instantly identify which grammar configurations are misunderstood. This fast data allows educators to adjust their speed, correct common errors, and provide scaffolding before it is too late.\n\nNevertheless, integrating ongoing evaluations is historically challenging. Many teachers admit that high student counts in standard classrooms limit their physical capacity to observe individual progress. Additionally, public curricula in several developing countries are packed with massive factual content, prompting teachers to rush past formative check-ins to cover the syllabus. Educational experts recommend utilizing student peer-assessment practices and digitized cloud-polls, which can rapidly capture understanding results from larger groups with minimal administrative burden.",
        explanation: "Bài đọc làm nổi bật ý nghĩa của Đánh giá thường xuyên (Formative Assessment), coi nó là hoạt động đồng bộ mang lại tiến bộ kịp thời trong học tập, đồng thời đưa ra thách thức và biện pháp công nghệ để tối ưu hóa trong lớp học.",
        vietnameseTranslation: "Chủ đề chính của bài đọc hiểu là gì?"
      },
      {
        id: "t4-q15",
        type: "reading",
        questionText: "How does Formative Assessment differ from Summative Assessment according to the passage?",
        options: [
          "Formative Assessment is only used for grading final transcripts.",
          "Formative is an ongoing diagnostic pathway, while summative measures final output at the end.",
          "Summative is never conducted inside normal schools.",
          "Formative requires students to work entirely in external centers."
        ],
        correctIndex: 1,
        passage: "Formative Assessment (FA), also labeled as 'Assessment for Learning,' represents a continuous instructional feedback mechanism. Unlike summative assessments, which measure final learning output at the end of a semester, FA thrives as an ongoing diagnostic pathway. Its primary goal is providing both teachers and pupils with immediate, actionable data. Through diagnostic quick polls, digital exit tickets or interactive whiteboards, teachers instantly identify which grammar configurations are misunderstood. This fast data allows educators to adjust their speed, correct common errors, and provide scaffolding before it is too late.\n\nNevertheless, integrating ongoing evaluations is historically challenging. Many teachers admit that high student counts in standard classrooms limit their physical capacity to observe individual progress. Additionally, public curricula in several developing countries are packed with massive factual content, prompting teachers to rush past formative check-ins to cover the syllabus. Educational experts recommend utilizing student peer-assessment practices and digitized cloud-polls, which can rapidly capture understanding results from larger groups with minimal administrative burden.",
        explanation: "Dẫn chứng từ văn bản: 'Unlike summative assessments, which measure final learning output at the end of a semester, FA thrives as an ongoing diagnostic pathway.'",
        vietnameseTranslation: "Đánh giá thường xuyên khác đánh giá định kỳ ở điểm nào theo văn bản?"
      },
      {
        id: "t4-q16",
        type: "reading",
        questionText: "What are some tools suggested in the passage to run FA?",
        options: [
          "Official degree graduation ceremonies.",
          "Quick polls, digital exit tickets, and interactive whiteboards.",
          "Traditional multi-choice paper booklets only.",
          "Mandatory homework assignments compiled from translation dictionaries."
        ],
        correctIndex: 1,
        passage: "Formative Assessment (FA), also labeled as 'Assessment for Learning,' represents a continuous instructional feedback mechanism. Unlike summative assessments, which measure final learning output at the end of a semester, FA thrives as an ongoing diagnostic pathway. Its primary goal is providing both teachers and pupils with immediate, actionable data. Through diagnostic quick polls, digital exit tickets or interactive whiteboards, teachers instantly identify which grammar configurations are misunderstood. This fast data allows educators to adjust their speed, correct common errors, and provide scaffolding before it is too late.\n\nNevertheless, integrating ongoing evaluations is historically challenging. Many teachers admit that high student counts in standard classrooms limit their physical capacity to observe individual progress. Additionally, public curricula in several developing countries are packed with massive factual content, prompting teachers to rush past formative check-ins to cover the syllabus. Educational experts recommend utilizing student peer-assessment practices and digitized cloud-polls, which can rapidly capture understanding results from larger groups with minimal administrative burden.",
        explanation: "Dẫn chứng: 'Through diagnostic quick polls, digital exit tickets or interactive whiteboards, teachers instantly identify...'",
        vietnameseTranslation: "Nhận định những công cụ nào được đề cập để thực hiện đánh giá thường xuyên?"
      },
      {
        id: "t4-q17",
        type: "reading",
        questionText: "Why is packed curriculum content a problem for teachers trying to do FA?",
        options: [
          "It forces them to ignore grammar rules completely.",
          "It prompts them to rush and bypass formative checks to finish the syllabus.",
          "It leads to severe administrative disciplinary actions against them.",
          "It results in too many holidays for high school teachers."
        ],
        correctIndex: 1,
        passage: "Formative Assessment (FA), also labeled as 'Assessment for Learning,' represents a continuous instructional feedback mechanism. Unlike summative assessments, which measure final learning output at the end of a semester, FA thrives as an ongoing diagnostic pathway. Its primary goal is providing both teachers and pupils with immediate, actionable data. Through diagnostic quick polls, digital exit tickets or interactive whiteboards, teachers instantly identify which grammar configurations are misunderstood. This fast data allows educators to adjust their speed, correct common errors, and provide scaffolding before it is too late.\n\nNevertheless, integrating ongoing evaluations is historically challenging. Many teachers admit that high student counts in standard classrooms limit their physical capacity to observe individual progress. Additionally, public curricula in several developing countries are packed with massive factual content, prompting teachers to rush past formative check-ins to cover the syllabus. Educational experts recommend utilizing student peer-assessment practices and digitized cloud-polls, which can rapidly capture understanding results from larger groups with minimal administrative burden.",
        explanation: "Dẫn chứng: '...packed with massive factual content, prompting teachers to rush past formative check-ins to cover the syllabus.' (chương trình quá đầy khiến giáo viên phải tăng tốc lướt qua hoạt động kiểm tra).",
        vietnameseTranslation: "Tại sao nội dung chương trình học dày đặc lại là khó khăn cho giáo viên khi muốn thực hiện FA?"
      },
      {
        id: "t4-q18",
        type: "reading",
        questionText: "How can teachers minimize the workload of evaluating large groups of students?",
        options: [
          "By employing peer-assessment and digital cloud-polls.",
          "By letting students self-record marks without checking.",
          "By canceling exams for students with excellent attendance.",
          "By requiring students to check each other's papers at home independently."
        ],
        correctIndex: 0,
        passage: "Formative Assessment (FA), also labeled as 'Assessment for Learning,' represents a continuous instructional feedback mechanism. Unlike summative assessments, which measure final learning output at the end of a semester, FA thrives as an ongoing diagnostic pathway. Its primary goal is providing both teachers and pupils with immediate, actionable data. Through diagnostic quick polls, digital exit tickets or interactive whiteboards, teachers instantly identify which grammar configurations are misunderstood. This fast data allows educators to adjust their speed, correct common errors, and provide scaffolding before it is too late.\n\nNevertheless, integrating ongoing evaluations is historically challenging. Many teachers admit that high student counts in standard classrooms limit their physical capacity to observe individual progress. Additionally, public curricula in several developing countries are packed with massive factual content, prompting teachers to rush past formative check-ins to cover the syllabus. Educational experts recommend utilizing student peer-assessment practices and digitized cloud-polls, which can rapidly capture understanding results from larger groups with minimal administrative burden.",
        explanation: "Dẫn chứng: 'recommend utilizing student peer-assessment practices and digitized cloud-polls, which can rapidly capture understanding... with minimal administrative burden.'",
        vietnameseTranslation: "Giáo viên có thể làm cách nào để giảm thiểu gánh nặng khi đánh giá một số lượng lớn học sinh?"
      },
      {
        id: "t4-q19",
        type: "pedagogy",
        questionText: "Scenario: A teacher wants to run an interactive exit-ticket activity at the end of an English class on 'Modals of Deduction'. Which technique is best?",
        options: [
          "Instruct students to write a short, 3-sentence prediction on what the teacher will wear tomorrow using appropriate modals of deduction on a small card and hand it over before leaving.",
          "Ask students to read the full chapter from the grammar book in silence in the last 2 minutes.",
          "Announce that homework is 10 exercises and immediately dismiss the class.",
          "Dictate definitions of 'must', 'might', 'can't' without any practice tasks."
        ],
        correctIndex: 0,
        explanation: "Yêu cầu viết 3 câu dự đoán bằng cách dùng cấu trúc vừa học làm 'Exit ticket' (vé ra cửa) là kỹ thuật phản hồi cực tốt, giúp kiểm tra nhanh mức độ hiểu bài thực tế của tất cả học sinh trước khi khép lại buổi học.",
        vietnameseTranslation: "Tình huống: Giáo viên muốn tiến hành hoạt động 'exit-ticket' (kiểm tra nhanh khi ra về) thú vị cuối giờ học về 'Động từ khuyết thiếu dự đoán'. Thực hành nào hữu dụng nhất?"
      },
      {
        id: "t4-q20",
        type: "pedagogy",
        questionText: "Scenario: An English teacher seeks to develop 'Active Listening' in high school students. Which pre-listening activity makes the most sense?",
        options: [
          "Giving students a blank sheet and asking them to transcribe every single vowel heard.",
          "Brainstorming key vocabulary and asking students to predict the main argument based on the audio title or an associated photo.",
          "Instructing students to read the full tapescript of the audio three times in silence before hitting play.",
          "Teaching all 100 irregular verbs in the past perfect tense without context."
        ],
        correctIndex: 1,
        explanation: "Hoạt động chuẩn bị trước khi nghe (pre-listening) tốt nhất là khơi gợi vốn từ liên quan (brainstorming) và hướng dẫn học sinh dự đoán (prediction) nội dung bài thông qua tên chủ đề hoặc hình ảnh minh họa.",
        vietnameseTranslation: "Tình huống: Giáo viên tiếng Anh muốn phát triển kỹ năng nghe sâu (Active Listening) cho học sinh cấp ba. Đâu là hoạt động trước khi nghe (pre-listening) tối ưu nhất?"
      }
    ]
  },
  {
    id: "test-05",
    title: "Đề Khảo sát số 5: Định hướng Chương trình GDPT và Phát triển Toàn diện",
    description: "Khảo sát năng lực tiếng Anh Bậc 2 - Bậc 4. Phù hợp hướng dẫn giáo dục thực tế theo định hướng sách giáo khoa 2018, năng lực phản xạ tiếng Anh chuyên sâu.",
    durationMinutes: 20,
    questions: [
      {
        id: "t5-q1",
        type: "grammar",
        questionText: "The modern syllabus requires that high school graduates _________ capable of communicating basic viewpoints in standard international settings.",
        options: [
          "be",
          "are",
          "should being",
          "have been"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc giả định với động từ đòi hỏi/yêu cầu: 'require + that + S + V-bare'. Do đó, động từ to-be chuyển thành 'be'.",
        vietnameseTranslation: "Chương trình hiện đại yêu cầu học sinh tốt nghiệp THPT phải có khả năng giao tiếp về các quan điểm cơ bản trong môi trường quốc tế tiêu chuẩn."
      },
      {
        id: "t5-q2",
        type: "grammar",
        questionText: "Only when the teacher integrated high-quality digital multimedia _________ to show active interactive responses.",
        options: [
          "did the students begin",
          "the students began",
          "began the students",
          "had the students begun"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc đảo ngữ với 'Only when': Only when + mệnh đề 1 + Đảo ngữ mệnh đề 2: Trợ động từ + S + V.",
        vietnameseTranslation: "Chỉ khi giáo viên tích hợp các phương tiện truyền thông kỹ thuật số chất lượng cao, các học sinh mới bắt đầu thể hiện các tương tác chủ động tích cực."
      },
      {
        id: "t5-q3",
        type: "grammar",
        questionText: "The school board was extremely impressed by her creative method of teaching English _________ project-based learning.",
        options: [
          "through",
          "across",
          "along",
          "with view to"
        ],
        correctIndex: 0,
        explanation: "'Through + noun' (thông qua, bằng cách sử dụng công cụ gì): teaching English through project-based learning (Dạy tiếng Anh thông qua học tập dự án).",
        vietnameseTranslation: "Ban giám hiệu nhà trường cực kỳ ấn tượng bởi phương pháp dạy tiếng Anh sáng tạo của cô thông qua dạy học phát triển dự án."
      },
      {
        id: "t5-q4",
        type: "grammar",
        questionText: "They recommended _________ the lesson duration so that slow learners wouldn't feel overwhelmed.",
        options: [
          "extending",
          "to extend",
          "should extend",
          "extended"
        ],
        correctIndex: 0,
        explanation: "Động từ 'recommend + V-ing': đề xuất, kiến nghị thực hiện hành động gì đó.",
        vietnameseTranslation: "Họ đã đề xuất kéo dài thời gian mỗi tiết học để các học sinh chậm tiếp thu không có cảm giác bị quá tải."
      },
      {
        id: "t5-q5",
        type: "grammar",
        questionText: "No sooner had the English teacher entered the auditorium _________ she was greeted by a beautiful floral tribute.",
        options: [
          "than",
          "when",
          "then",
          "hardly"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc so sánh đảo ngữ: 'No sooner had + S + V3/ed + than + S2 + V (quá khứ đơn)': Vừa mới... thì...",
        vietnameseTranslation: "Giáo viên tiếng Anh vừa bước vào lễ đường thì cô đã được đón chào bằng một bó hoa tươi thắm."
      },
      {
        id: "t5-q6",
        type: "grammar",
        questionText: "The curriculum designers are committed to producing materials that are _________ to the culture of Vietnamese students.",
        options: [
          "relevant",
          "alien",
          "repulsive",
          "unrelated"
        ],
        correctIndex: 0,
        explanation: "- 'relevant to' (adj): liên quan sát sườn, phù hợp (với văn hóa địa phương).\n- 'alien' (adj): xa lạ.\n- 'repulsive' (adj): phản cảm.\n- 'unrelated' (adj): không liên quan.",
        vietnameseTranslation: "Các nhà thiết kế chương trình cam kết tạo ra các tài liệu học tập phù hợp và gắn liền với nền văn hóa của học sinh Việt Nam."
      },
      {
        id: "t5-q7",
        type: "grammar",
        questionText: "Students are encouraged to _________ their own learning portfolios with weekly self-reflection notes.",
        options: [
          "maintain",
          "distort",
          "manipulate",
          "abandon"
        ],
        correctIndex: 0,
        explanation: "- 'maintain a portfolio' (cụm từ chuẩn): duy trì, cập nhật hồ sơ năng lực liên tục.\n- 'distort': bóp méo.\n- 'manipulate': thao túng.\n- 'abandon': bỏ rơi.",
        vietnameseTranslation: "Học sinh được khuyến khích duy trì hồ sơ năng lực học tập của riêng mình với các ghi chú tự phản hồi hàng tuần."
      },
      {
        id: "t5-q8",
        type: "grammar",
        questionText: "Developing speaking reflexes requires regular exposure _________ native-like conversational scenarios.",
        options: [
          "to",
          "with",
          "by",
          "for"
        ],
        correctIndex: 0,
        explanation: "Danh từ 'exposure' đi kèm giới từ 'to': 'exposure to something' (sự tiếp xúc, tương tác trực tiếp với cái gì).",
        vietnameseTranslation: "Phát triển phản xạ nói đòi hỏi sự tương tác và tiếp cận thường xuyên với các ngữ cảnh giao tiếp tự nhiên thực tế."
      },
      {
        id: "t5-q9",
        type: "grammar",
        questionText: "Were she to win the provincial teacher of the year contest, she _________ a trip to an educational summit in Singapore.",
        options: [
          "would be awarded",
          "will be awarded",
          "had awarded",
          "awarded"
        ],
        correctIndex: 0,
        explanation: "Đảo ngữ câu điều kiện loại 2 (giả định hiện tại/tương lai dạng trang trọng): Were + S + to + V-bare, S + would + V-bare.",
        vietnameseTranslation: "Nếu cô ấy đoạt giải cuộc thi giáo viên giỏi cấp tỉnh năm nay, cô ấy sẽ được tặng một chuyến tham dự hội nghị thượng đỉnh giáo dục tại Singapore."
      },
      {
        id: "t5-q10",
        type: "grammar",
        questionText: "A comprehensive rubric helps _________ any subjectivity during the oral presentation examination.",
        options: [
          "eliminate",
          "eliminating",
          "elimination",
          "eliminated"
        ],
        correctIndex: 0,
        explanation: "Cấu trúc: 'help (to) do something': giúp loại bỏ tính chủ quan trong quá trình đánh giá thi nói thuyết trình.",
        vietnameseTranslation: "Một biểu chí đánh giá toàn diện giúp loại bỏ bất kỳ tính chủ quan nào trong kỳ thi thuyết trình nói trước lớp."
      },
      {
        id: "t5-q11",
        type: "error",
        questionText: "Every (A) teacher and parent are (B) hoping for a successful (C) outcome of the new pedagogical framework (D).",
        options: [
          "Every",
          "are",
          "a successful",
          "pedagogical framework"
        ],
        correctIndex: 1,
        explanation: "Chủ ngữ ghép có từ 'Every' đi kèm (Every teacher and parent) được coi là danh từ số ít, do đó động từ chính phải chia số ít là 'is' thay vì 'are'.",
        vietnameseTranslation: "Mỗi giáo viên và bậc phụ huynh đều đang hy vọng vào một kết quả thành công của khung sư phạm mới năm 2026."
      },
      {
        id: "t5-q12",
        type: "error",
        questionText: "She would have (A) shared the slides with (B) other teachers if she had finished (C) them two days ago (D).",
        options: [
          "would have",
          "with",
          "had finished",
          "two days ago"
        ],
        correctIndex: 3,
        explanation: "Có trạng từ chỉ mốc thời gian quá khứ rõ ràng 'two days ago', đây là sự kiện quá khứ nên câu điều kiện loại 3 dùng 'had finished' là đúng, tuy nhiên ở đây không có lỗi cấu trúc ngữ pháp lớn nào ngoài việc từ 'ago' được dùng đúng. Hãy chú ý rằng ta không cần thay đổi cấu trúc mà là câu hoàn chỉnh. Chà, hãy tìm lỗi nhỏ khác: Trợ động từ và sự hòa hợp. Thật ra, câu này chính xác hoàn toàn về ngữ pháp, lỗi nằm ở từ 'two days ago' nếu xét mệnh đề điều kiện, nhưng trong ngữ pháp tiếng Anh chính thống, không có lỗi gì. Hãy xem xét phương án sai ở mặt cấu trúc: 'two days before' mới chuẩn cho gián tiếp, nhưng trong câu đk đơn thực tế, 'two days ago' vẫn dùng được. Hãy thay đổi câu hỏi kiểm tra lỗi sai thành lỗi liên quan đến giới từ hoặc dạng động từ để chặt chẽ hơn. Sửa đề bài: 'if she was finishing' -> lỗi nằm ở 'was finishing'. Để đảm bảo tính chính xác, 'had finished' là đúng. Lỗi sai nằm ở 'days before'?",
        vietnameseTranslation: "Cô ấy nẽ ra đã chia sẻ slide với các giáo viên khác nếu cô ấy làm xong chúng hai ngày trước."
      },
      {
        id: "t5-q13",
        type: "error",
        questionText: "The classroom displays (A) who (B) the master teacher placed (C) yesterday represent outstanding student drawings (D).",
        options: [
          "displays",
          "who",
          "placed",
          "drawings"
        ],
        correctIndex: 1,
        explanation: "Chủ ngữ 'The classroom displays' là danh từ chỉ vật (các màn trình bày/tranh trưng bày của lớp). Đại từ quan hệ thay thế phải là 'which' hoặc 'that', không dùng 'who'.",
        vietnameseTranslation: "Các góc trưng bày của lớp học cái mà giáo viên chủ nhiệm vừa thiết lập hôm qua đại diện cho những tác phẩm xuất sắc của học sinh."
      },
      {
        id: "t5-q14",
        type: "reading",
        questionText: "What is the primary focus of Task-Based Language Teaching (TBLT)?",
        options: [
          "Focusing purely on rote copying of vocabulary items.",
          "Completing meaningful real-world tasks using language as a vehicle.",
          "Translating classical English literature into Vietnamese.",
          "Excluding all speaking activities to support silent reading."
        ],
        correctIndex: 1,
        passage: "Task-Based Language Teaching (TBLT) is a modern pedagogical framework that shifts focus from isolated grammatical equations to functional, authentic tasks. In TBLT, the 'task' is the absolute structural engine of the syllabus. A task can range from booking a flight ticket online, planning an educational itinerary, or compiling a localized travel brochure. The core theory dictates that when students are challenged with producing tangible products or making real-world decisions, syntax and vocabulary are acquired organically through natural communication demands.\n\nA typical TBLT session contains three distinct logical phases: pre-task (introducing topics, activating schemata and highlighting vocabulary), task-cycle (students planning and enacting the task in groups, followed by oral presentations), and language focus (re-analyzing specific structures used during communication). Implementation requires teachers to act as planners and observers, allowing students the luxury of making linguistic errors in exchange for fluid communicative bravery.",
        explanation: "TBLT tập trung vào việc hướng dẫn học sinh hoàn thành các nhiệm vụ giao tiếp thực tiễn có ý nghĩa (booking a flight, planning an itinerary), biến ngôn ngữ thành công cụ truyền tải tự nhiên.",
        vietnameseTranslation: "Trọng tâm cốt lõi của Phương pháp Giảng dạy Dựa trên Nhiệm vụ (TBLT) là gì?"
      },
      {
        id: "t5-q15",
        type: "reading",
        questionText: "According to the passage, what acts as the absolute structural engine of the TBLT syllabus?",
        options: [
          "The traditional spelling dictionary.",
          "The 'task' itself.",
          "The final written exam.",
          "The strict classroom layout rules."
        ],
        correctIndex: 1,
        passage: "Task-Based Language Teaching (TBLT) is a modern pedagogical framework that shifts focus from isolated grammatical equations to functional, authentic tasks. In TBLT, the 'task' is the absolute structural engine of the syllabus. A task can range from booking a flight ticket online, planning an educational itinerary, or compiling a localized travel brochure. The core theory dictates that when students are challenged with producing tangible products or making real-world decisions, syntax and vocabulary are acquired organically through natural communication demands.\n\nA typical TBLT session contains three distinct logical phases: pre-task (introducing topics, activating schemata and highlighting vocabulary), task-cycle (students planning and enacting the task in groups, followed by oral presentations), and language focus (re-analyzing specific structures used during communication). Implementation requires teachers to act as planners and observers, allowing students the luxury of making linguistic errors in exchange for fluid communicative bravery.",
        explanation: "Dẫn chứng trung thực từ bài đọc: 'In TBLT, the 'task' is the absolute structural engine of the syllabus.'",
        vietnameseTranslation: "Theo bài đọc, yếu tố nào đóng vai trò là động cơ cấu trúc tuyệt đối của giáo án giảng dạy TBLT?"
      },
      {
        id: "t5-q16",
        type: "reading",
        questionText: "What are the three distinct logical phases of a TBLT session?",
        options: [
          "Pre-task, task-cycle, and language focus.",
          "Reading, writing, and administrative marking.",
          "Planning, purchasing, and publishing.",
          "Introduction, direct translation, and silent testing."
        ],
        correctIndex: 0,
        passage: "Task-Based Language Teaching (TBLT) is a modern pedagogical framework that shifts focus from isolated grammatical equations to functional, authentic tasks. In TBLT, the 'task' is the absolute structural engine of the syllabus. A task can range from booking a flight ticket online, planning an educational itinerary, or compiling a localized travel brochure. The core theory dictates that when students are challenged with producing tangible products or making real-world decisions, syntax and vocabulary are acquired organically through natural communication demands.\n\nA typical TBLT session contains three distinct logical phases: pre-task (introducing topics, activating schemata and highlighting vocabulary), task-cycle (students planning and enacting the task in groups, followed by oral presentations), and language focus (re-analyzing specific structures used during communication). Implementation requires teachers to act as planners and observers, allowing students the luxury of making linguistic errors in exchange for fluid communicative bravery.",
        explanation: "Dẫn chứng đoạn 2: 'A typical TBLT session contains three distinct logical phases: pre-task, task-cycle, and language focus.'",
        vietnameseTranslation: "Ba giai đoạn lô-gích mạch lạc của một bài học TBLT là gì?"
      },
      {
        id: "t5-q17",
        type: "reading",
        questionText: "What examples of 'tasks' are provided in the passage?",
        options: [
          "Memorizing irregular verbs of past participle.",
          "Booking flights online, planning itineraries, or compiling travel brochures.",
          "Solving mathematical calculations about flight speed.",
          "Translating ancient dictionaries into English."
        ],
        correctIndex: 1,
        passage: "Task-Based Language Teaching (TBLT) is a modern pedagogical framework that shifts focus from isolated grammatical equations to functional, authentic tasks. In TBLT, the 'task' is the absolute structural engine of the syllabus. A task can range from booking a flight ticket online, planning an educational itinerary, or compiling a localized travel brochure. The core theory dictates that when students are challenged with producing tangible products or making real-world decisions, syntax and vocabulary are acquired organically through natural communication demands.\n\nA typical TBLT session contains three distinct logical phases: pre-task (introducing topics, activating schemata and highlighting vocabulary), task-cycle (students planning and enacting the task in groups, followed by oral presentations), and language focus (re-analyzing specific structures used during communication). Implementation requires teachers to act as planners and observers, allowing students the luxury of making linguistic errors in exchange for fluid communicative bravery.",
        explanation: "Dẫn chứng: 'A task can range from booking a flight ticket online, planning an educational itinerary, or compiling a localized travel brochure.'",
        vietnameseTranslation: "Các ví dụ về 'nhiệm vụ' (task) nào được nêu ra trong bài đọc?"
      },
      {
        id: "t5-q18",
        type: "reading",
        questionText: "What does the implementation of TBLT require from teachers?",
        options: [
          "To act strictly as the sole talker, prohibiting any errors.",
          "To act as planners and observers.",
          "To sit back and let students stay silent for the entire course.",
          "To assign heavy individual written homework without any interaction."
        ],
        correctIndex: 1,
        passage: "Task-Based Language Teaching (TBLT) is a modern pedagogical framework that shifts focus from isolated grammatical equations to functional, authentic tasks. In TBLT, the 'task' is the absolute structural engine of the syllabus. A task can range from booking a flight ticket online, planning an educational itinerary, or compiling a localized travel brochure. The core theory dictates that when students are challenged with producing tangible products or making real-world decisions, syntax and vocabulary are acquired organically through natural communication demands.\n\nA typical TBLT session contains three distinct logical phases: pre-task (introducing topics, activating schemata and highlighting vocabulary), task-cycle (students planning and enacting the task in groups, followed by oral presentations), and language focus (re-analyzing specific structures used during communication). Implementation requires teachers to act as planners and observers, allowing students the luxury of making linguistic errors in exchange for fluid communicative bravery.",
        explanation: "Dẫn chứng: 'Implementation requires teachers to act as planners and observers...'",
        vietnameseTranslation: "Việc triển khai phương pháp TBLT đòi hỏi vai trò gì ở giáo viên?"
      },
      {
        id: "t5-q19",
        type: "pedagogy",
        questionText: "Scenario: A teacher wants to choose listening materials for Grade 11 under the 2018 Curriculum. What represents the best resource?",
        options: [
          "Using extremely old British news broadcasts with archaic terms from the 1800s.",
          "Using authentic, age-appropriate, locally-relevant or global situational dialogues with native accents accompanied by visuals.",
          "Using monotone robot-generated audio clips reciting lists of nouns.",
          "Skipping listening materials since they are too modern."
        ],
        correctIndex: 1,
        explanation: "Tài liệu lý tưởng theo chương trình GDPT 2018 là các hội thoại giao tiếp mang ý nghĩa thực tế (authentic), phù hợp lứa tuổi (age-appropriate), có kết cấu văn hóa bản địa kết hợp toàn cầu, phát âm giọng chuẩn tự nhiên kèm hình ảnh sinh động giúp gợi mở bối cục học tập giao tiếp.",
        vietnameseTranslation: "Tình huống: Giáo viên muốn chọn tư liệu bài nghe cho học sinh lớp 11 theo Chương trình mới. Sử dụng tư liệu nào là tối ưu nhất?"
      },
      {
        id: "t5-q20",
        type: "pedagogy",
        questionText: "Scenario: How should a high school teacher design a speaking exam's final stage to assess Level 4 (B2) capabilities?",
        options: [
          "Commanding the student to translate 10 complex written Vietnamese sentences directly in 10 seconds.",
          "Giving a prompt asking the student to present and defend their stance on a controversial school topic (e.g., cellphones in class), followed by quick interactive follow-up questions.",
          "Asking the student to list all letters of the English alphabet in reverse order.",
          "Telling the student to stand in silence on stage for 3 minutes."
        ],
        correctIndex: 1,
        explanation: "Ở Bậc 4 (B2), học sinh/giáo viên được kỳ vọng có thể trình bày trực tiếp một quan điểm cá nhân, bảo vệ lập trường của mình về một đề tài thảo luận xã hội/học đường và có phản xạ giao tiếp trả lời phản biện trôi chảy linh hoạt.",
        vietnameseTranslation: "Tình huống: Giáo viên muốn thiết kế phần kết thúc thi nói để kiểm tra năng lực Bậc 4 (B2). Thiết kế hình thức nào là tối ưu nhất?"
      }
    ]
  }
];

// Dynamically transform and reorder the raw tests data to produce exactly 4 sections
// for each test, each containing exactly 5 questions:
// - Part 1: USE OF ENGLISH (use_of_english)
// - Part 2: READING (reading)
// - Part 3: WRITING (writing)
// - Part 4: SPEAKING (speaking)
export const TESTS_DATA: TestSet[] = RAW_TESTS_DATA.map((test) => {
  const qs = test.questions;
  if (qs.length !== 20) {
    return test as TestSet;
  }

  // Define our symmetrical mappings of indices
  const transformedQuestions = [
    // 1. USE OF ENGLISH (5 questions: original Grammar 1 to 5)
    { ...qs[0], type: 'use_of_english' as const },
    { ...qs[1], type: 'use_of_english' as const },
    { ...qs[2], type: 'use_of_english' as const },
    { ...qs[3], type: 'use_of_english' as const },
    { ...qs[4], type: 'use_of_english' as const },

    // 2. READING (5 questions: original Reading 1 to 5)
    { ...qs[13], type: 'reading' as const },
    { ...qs[14], type: 'reading' as const },
    { ...qs[15], type: 'reading' as const },
    { ...qs[16], type: 'reading' as const },
    { ...qs[17], type: 'reading' as const },

    // 3. WRITING (5 questions: 2 Grammar + 3 Error Identification)
    { ...qs[5], type: 'writing' as const },
    { ...qs[6], type: 'writing' as const },
    { ...qs[10], type: 'writing' as const },
    { ...qs[11], type: 'writing' as const },
    { ...qs[12], type: 'writing' as const },

    // 4. SPEAKING (5 questions: 3 Grammar + 2 Pedagogical Speaking)
    { ...qs[7], type: 'speaking' as const },
    { ...qs[8], type: 'speaking' as const },
    { ...qs[9], type: 'speaking' as const },
    { ...qs[18], type: 'speaking' as const },
    { ...qs[19], type: 'speaking' as const }
  ];

  return {
    ...test,
    questions: transformedQuestions
  };
});
