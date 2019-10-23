/**
 * click-target.js
 *   2019/08/04: 作成（click-target_mwc2019/ 内のコード）　
 * 【修正履歴】
 *   2019/10/22: 変数宣言の修正（varをconstまたはletにした）
 *      ・ tn はletで宣言（ const で宣言すると動かなかった）
 *      ・ tn1~tn3は const で宣言（let でないとダメかと思ったが， 動いた
 *   2019/10/23：変数tnの宣言と代入の行を修正（まとめてconstで変数宣言）
 *  -----
 *    201910/23:関数rotateTargetの合理化
 *      ・配列を利用して同じようなものをまとめた ＆まとめるために配列化
 *          rotateTarget1～3 を rotateTarget[1]~[3] 
 *          fl1～3 を fl[1]~[3]
 *          timer1～3 を timer[1]~[3]
 *          target1～3 を target[1]~[3]
 *          tn1～3 を targetNumber[1]~[3] ※変数名注意
 *       ・数字を出すスピードを，変数 windowNumberSpeed として定義
 *             クリックしたときに出てた数字と取得するwindowNumberのズレがごまかせるよう速め（50）に設定したが，速すぎる
 *        ・変数名の変更：tn　→　tnBase 
 */
'use strict';
const resultArea =  document.getElementById('result-area');
const retry =  document.getElementById('retry');

let nokoriKai = 5;
let shootNumber = null;
let shootNumberList = '';

let fl =[ ,1,1,1]; // fl[i]（i=1,2,3 ）は target[i]が表なら1，裏なら0）※f[0]は定義しない

let target =[];
target[1] = document.getElementById('target1');
target[2] = document.getElementById('target2');
target[3] = document.getElementById('target3');

let rotateTarget = []; //関数rotateTarget[i](i=1～3)を入れる配列
let timer = [];// rotateTarget[i](i=1～3)で使うtimer[i]の配列

const kaitensokudo = 40; // 的が裏返る速さはここで調整（setInterval の間隔）
const windowNumberSpeed = 50; // 窓の数字を出すスピード

// 的の数字  --- (new Date() の1桁目～3桁目が的の番号になる)
const tnBase = new Date().getTime(); 
const targetNumber =[ ,//targetNumber[0]は定義しない
    tnBase % 10, // targetNumber[1] :target1の数字
    Math.floor(tnBase / 10) % 10, // targetNumber[2]: target2の数字
    Math.floor(tnBase / 100) % 10 // targetNumber[3]: target3の数字
];
target[1].innerText = targetNumber[1];
target[2].innerText = targetNumber[2];
target[3].innerText = targetNumber[3];
document.getElementById('target-number-list').innerText = '的の数字：' + targetNumber[1] + ' ' + targetNumber[2] + ' ' + targetNumber[3];

//  スタートボタンを押したらカウンタースタート
let windowNumber = 0;
let windowTimer = null;
document.getElementById('start-button').onclick = function () {
    if (nokoriKai !== 0) {
        windowTimer = setInterval(windowNumberShow, windowNumberSpeed); //　数字を出すスピードはwindowNumberSpeedで調節
    }
}

// 中止ボタンを押したらストップする
document.getElementById('game-stop').onclick = function () {
    clearInterval(windowTimer);
    nokoriKai = 0;
    resultArea.classList.remove('before');// resultArea の文字が見えるように
    document.getElementById('result-area').innerText = '--- ゲームを中止しました ---';
    retry.classList.remove('before'); // 「もう1回する」ボタンを見せる
};

// 「もう一度」ボタンを押したとき　
document.getElementById('retry').onclick = function () {
    location.reload(); // ページの再読み込み
};

// 「的の数字を変える」ボタン　
document.getElementById('tn-button').onclick = function () {
    location.reload(); // ページの再読み込み
};

//　 窓に0～9の数字を出す & シュートしたときの処理
function windowNumberShow() {
    if ((nokoriKai === 0) || (fl[1] + fl[2] + fl[3] === 0)) {
        clearInterval(windowTimer);
        setTimeout(result, 1000); // 1秒まって結果を表示
    }
    document.getElementById('windowNumber').innerText = windowNumber;
    document.getElementById("shoot-button").onclick = function () {
        if (nokoriKai === 0) {
            result; // nokoriKai が0なら結果表示
        } else {
            shootNumber = windowNumber;
            shootNumberList = shootNumberList + shootNumber;
            nokoriKai = nokoriKai - 1;
            document.getElementById('shoot-number-list').innerText = 'シュートした数字：' + shootNumberList;
            for(let k=1; k <=3;k++){
                if (shootNumber === targetNumber[k] && fl[k] === 1) {
                    rotateTarget[k]();
                    fl[k] = 0;
                }
            }
         }
    };
    windowNumber = (windowNumber + 1) % 10;
}

// 的を回転させる関数
for(let i = 1; i <=3; i++){
    // 的i(i=1,2,3)を回転
    rotateTarget[i] = function () {
        fl[i] == 0;
        timer[i]= null; // タイマーのID
        let kaitenkaku = 0;
        function rotate() {
            kaitenkaku = kaitenkaku + 6;
            //半周回ったらストップ
            if (kaitenkaku > 180 && timer[i] !== null) {
                clearInterval(timer[i]); // タイマー停止
            }
            //回転角によって状態を変える
            if (0 <= kaitenkaku && kaitenkaku < 90) {
                target[i].classList.remove('cannotSee');
                target[i].classList.add('canSee');
            } else {
                target[i].classList.remove('canSee');
                target[i].classList.add('cannotSee');
            }
            target[i].style.transform = 'rotateX(' + kaitenkaku + 'deg)';
        }
        timer[i] = setInterval(rotate, kaitensokudo);
    }    
}

// ゲームの結果を表示する関数
function result() {
    resultArea.classList.remove('before');
    resultArea.classList.add('after');
    if (fl[1] + fl[2] + fl[3] === 0) {
        document.getElementById('result-area').innerText = 'パーフェクト！ すごい！';
    } else if (fl[1] + fl[2] + fl[3] === 1) {
        document.getElementById('result-area').innerText = '2つ成功！ やったね！';
    } else if (fl[1] + fl[2] + fl[3] === 2) {
        document.getElementById('result-area').innerText = '1つ成功！ まずまず。';
    } else if (fl[1] + fl[2] + fl[3] === 3) {
        document.getElementById('result-area').innerText = '残念！';
    }
    retry.classList.remove('before'); // 「もう1回する」ボタンを見せる
}

// ------ click-target.js ここまで ----------