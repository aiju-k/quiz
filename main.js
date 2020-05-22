'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const bodyLabel = document.querySelector('body');

  const quizSet = [
    {q: '趣味は？', c: ['読書', '釣り', 'フットサル', 'ゲーム']},
    {q: '好きな作家は？', c: ['湊かなえ', '有川浩', '伊坂幸太郎', '東野圭吾']},
    {q: '一番好きな小説は？', c: ['『豆の上で眠る』', '『告白』', '『絶唱』', '『白雪姫殺人事件』']},
    {q: '好きなアニメは？', c:['ヴァイオレット・エヴァ―ガーデン', '鬼滅の刃', 'SAO', 'コード・ギアス']},
    {q: '好きなゲームは？', c:['ドラクエ', 'APEX', 'どうぶつの森', 'シャドウバース']},
    {q: '嫌いなものは？', c:['タバコ', 'ピーマン', 'インスタ', 'ホラー']},
    {q: '好きなアーティストは？', c:['LiSA', 'RADWIMPS', 'Official髭男dism', '平井堅']},
    {q: '最近の悩みは？', c:['オンライン授業', '外出自粛', '金欠', '友達に会えない']},
    {q: '今マジで欲しいものは？', c:['MacBook', '恋人', 'PS4', 'デスク用の椅子']},
  ];

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }

    return arr;
  }


  function checkAnswer(li) {
    // if (isAnswered === true) {
    if (isAnswered) {
      return;
    }

    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = '回答ありがとう！  結果を表示';
    }
  }

  setQuiz();


  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }

    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `正解数: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }

  });
}