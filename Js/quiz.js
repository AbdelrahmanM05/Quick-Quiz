export class Quiz {
  constructor(data) {
    this.data = data;
    this.currentIndex = 0;
    this.correctAnswer;
    console.log(data);
    this.questions = document.querySelector("#questions");
    document.querySelector("#to").innerText = this.data.length;
    this.from = document.querySelector("#from");
    this.question = document.querySelector("#shown-ques");
    this.numOfQuestion = document.querySelector("#numOfQuestions");
    this.shownAnswers = document.querySelector("#answers");
    this.showQuestions();
    this.answerAlert = document.querySelector("#answer-alert");
    this.finalScore = document.querySelector("#finalScore");
    this.correct = document.querySelector("#correct");
    this.incorrect = document.querySelector("#incorrect");
    this.shownScore = 0;
    document.querySelector("#nextQuestion").addEventListener("click", () => {
      this.nextQuestion();
    });
    document.getElementById("end").addEventListener("click", () => {
      location.reload();
    });
  }

  showQuestions() {
    this.from.innerText = this.currentIndex + 1;
    const currentQuestion = this.data[this.currentIndex];
    this.question.innerHTML = currentQuestion.question;
    // this.numOfQuestion.innerText = 1;
    this.correctAnswer = currentQuestion.correct_answer;
    const answers = [...currentQuestion.incorrect_answers];
    console.log(answers, this.correctAnswer);
    const targetIndex = Math.ceil(Math.random() * answers.length);
    answers.splice(targetIndex, 0, this.correctAnswer);
    console.log(targetIndex, answers);
    let answersBox = ``;
    for (let i = 0; i < answers.length; i++) {
      answersBox += `<li class="pb-3">
              <div class="pretty p-icon p-round">
                <input type="radio" name="answer" value="${answers[i]}" />
                <div class="state p-info">
                  <i class="icon mdi mdi-check"></i>
                  <label>${answers[i]}</label>
                </div>
              </div>
            </li>`;
    }
    this.shownAnswers.innerHTML = answersBox;
  }

  nextQuestion() {
    const checkedAnswer = document.querySelector(
      "[name='answer']:checked"
    )?.value;
    console.log(checkedAnswer);
    if (checkedAnswer != undefined) {
      this.answerAlert.classList.remove("show");
      this.currentIndex++;
      if (this.currentIndex > this.data.length - 1) {
        this.questions.classList.remove("show");
        this.finalScore.classList.add("show");
        document.querySelector("#score").innerHTML = this.shownScore;
      } else {
        if (checkedAnswer === this.correctAnswer) {
          this.correct.classList.add("show");
          setTimeout(() => {
            this.correct.classList.remove("show");
          }, 500);
          this.shownScore++;
        } else {
          this.incorrect.classList.add("show");
          setTimeout(() => {
            this.incorrect.classList.remove("show");
          }, 500);
          console.log(this.shownScore, this.correctAnswer);
        }
        this.showQuestions();
      }
    } else {
      this.answerAlert.classList.add("show");
    }
  }
}
