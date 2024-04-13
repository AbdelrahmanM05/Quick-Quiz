import { Quiz } from "./quiz.js";

export class Setting {
  constructor() {
    this.setting = document.querySelector("#setting");
    this.questions = document.querySelector("#questions");
    document
      .querySelector("#start")
      .addEventListener("click", this.startQuestions.bind(this));
  }

  async startQuestions() {
    const category = document.querySelector("#categories").value;
    const difficulty = document.querySelector(
      '[name="difficulty"]:checked'
    ).value;
    const numberOfQuestions = document.querySelector("#amount").value;
    if (numberOfQuestions > 0) {
      const data = await this.getQuestions(
        numberOfQuestions,
        category,
        difficulty
      );

      const quiz = new Quiz(data);
      this.setting.classList.remove("show");
      this.questions.classList.add("show");
    } else {
      document.querySelector("#alert_num").classList.add("show");
    }
  }
  async getQuestions(amount, cat, diff) {
    const apiResponse = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${diff}`
    );
    const response = await apiResponse.json();
    return response.results;
  }
}
// https://opentdb.com/api.php?amount=10&category=21&difficulty=medium
