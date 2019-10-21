/**
 * click-target.js
 *     2019/08/04: 作成（click-target_mwc2019/ 内のコード）　
 *   
 */
var resultArea =  document.getElementById('result-area');
var retry =  document.getElementById('retry');

var nokoriKai = 5;
var shootNumber = null;
var shootNumberList = '';
var fl1 = 1; //target1が表なら1，裏なら0
var fl2 = 1; //target2が表なら1，裏なら0
var fl3 = 1; //target3が表なら1，裏なら0

var kaitensokudo = 40; // 的が裏返る速さはここで調整（setInterval の間隔）

// 的の数字  --- (new Date() の1桁目～3桁目が的の番号になる)
var tn = new Date();
tn = tn.getTime();
var tn1 = tn % 10; // target1の数字
var tn2 = Math.floor(tn / 10) % 10; // target2の数字
var tn3 = Math.floor(tn / 100) % 10; // target3の数字
document.getElementById('target1').innerText = tn1;
document.getElementById('target2').innerText = tn2;
document.getElementById('target3').innerText = tn3;
document.getElementById('target-number-list').innerText = '的の数字：' + tn1 + ' ' + tn2 + ' ' + tn3;

//  スタートボタンを押したらカウンタースタート
var windowNumber = 0;
var windowTimer = null;
document.getElementById('start-button').onclick = function () {
    if (nokoriKai !== 0) {
        windowTimer = setInterval(windowNumberShow, 50); //　数字を出すスピードはここで調節---クリックしたときに出てた数字と取得するwindowNumberのズレがごまかせるよう速めに設定する！
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
    if ((nokoriKai === 0) || (fl1 + fl2 + fl3 === 0)) {
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
            if (shootNumber === tn1 && fl1 === 1) {
                rotateTarget1();
                fl1 = 0;
            }
            if (shootNumber === tn2 && fl2 === 1) {
                rotateTarget2();
                fl2 = 0;
            }
            if (shootNumber === tn3 && fl3 === 1) {
                rotateTarget3();
                fl3 = 0;
            }
        }
    };
    windowNumber = (windowNumber + 1) % 10;
}

// 的1を回転
function rotateTarget1() {

    fl1 == 0;
    var timer1 = null; // タイマーのID
    var kaitenkaku = 0;
    function rotate() {
        kaitenkaku = kaitenkaku + 6;
        //半周回ったらストップ
        if (kaitenkaku > 180 && timer1 !== null) {
            clearInterval(timer1); // タイマー停止
        }
        //回転角によって状態を変える
        if (0 <= kaitenkaku && kaitenkaku < 90) {
            target1.classList.remove('cannotSee');
            target1.classList.add('canSee');
        } else {
            target1.classList.remove('canSee');
            target1.classList.add('cannotSee');
        }
        target1.style.transform = 'rotateX(' + kaitenkaku + 'deg)';
    }
    timer1 = setInterval(rotate, kaitensokudo);
}

// 的2を回転
function rotateTarget2() {
    fl2 == 0;
    var timer2 = null; // タイマーのID
    var kaitenkaku = 0;
    function rotate() {
        kaitenkaku = kaitenkaku + 6;
        //半周回ったらストップ
        if (kaitenkaku > 180 && timer2 !== null) {
            clearInterval(timer2); // タイマー停止
        }
        //回転角によって状態を変える
        if (0 <= kaitenkaku && kaitenkaku < 90) {
            target2.classList.remove('cannotSee');
            target2.classList.add('canSee');
        } else {
            target2.classList.remove('canSee');
            target2.classList.add('cannotSee');
        }
        target2.style.transform = 'rotateX(' + kaitenkaku + 'deg)';
    }
    timer2 = setInterval(rotate, kaitensokudo);
}

// 的3を回転
function rotateTarget3() {
    fl3 == 0;
    var timer3 = null; // タイマーのID
    var kaitenkaku = 0;
    function rotate() {
        kaitenkaku = kaitenkaku + 6;
        //半周回ったらストップ
        if (kaitenkaku > 180 && timer3 !== null) {
            clearInterval(timer3); // タイマー停止
        }
        //回転角によって状態を変える
        if (0 <= kaitenkaku && kaitenkaku < 90) {
            target3.classList.remove('cannotSee');
            target3.classList.add('canSee');
        } else {
            target3.classList.remove('canSee');
            target3.classList.add('cannotSee');
        }
        target3.style.transform = 'rotateX(' + kaitenkaku + 'deg)';
    }
    timer3 = setInterval(rotate, kaitensokudo);
}

// ゲームの結果を表示する関数
function result() {
    // var resultArea =  document.getElementById('result-area');  //　変数宣言は全体の冒頭におくことにした
    //var retry =  document.getElementById('retry');  //　変数宣言は全体の冒頭におくことにした
    resultArea.classList.remove('before');
    resultArea.classList.add('after');
    if (fl1 + fl2 + fl3 === 0) {
        document.getElementById('result-area').innerText = 'パーフェクト！ すごい！';
    } else if (fl1 + fl2 + fl3 === 1) {
        document.getElementById('result-area').innerText = '2つ成功！ やったね！';
    } else if (fl1 + fl2 + fl3 === 2) {
        document.getElementById('result-area').innerText = '1つ成功！ まずまず。';
    } else if (fl1 + fl2 + fl3 === 3) {
        document.getElementById('result-area').innerText = '残念！';
    }
    retry.classList.remove('before'); // 「もう1回する」ボタンを見せる
}

// ------ click-target.js ここまで ----------