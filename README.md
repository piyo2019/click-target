# このリポジトリについて

  「N予備校 動くWebページコンテスト 2019夏」の応募作品 click-target 
   https://progedu.github.io/web-contests/move-webcontest2019-summer/results/piyo/  <br>
  の修正のためのリポジトリです。<br>
   (応募時のコードは click-target_mwc2019s/ 内にあります）

   フィードバックコメントをいただいたので，それを踏まえて修正していこうと思っています。

  - 課題1： 変数宣言をvarでなく, constやletに
  - 課題2： 関数 rotateTarget1~3 の合理化
  - 課題3： ゲームの難易度の調整 

### 【修正履歴】

#####   2019/10/22: 変数宣言の修正（varをconstまたはletにした）(課題1）
 - tn はletで宣言（ const で宣言すると動かなかった）
 - tn1~tn3は const で宣言（let でないとダメかと思ったが， 動いた
 -   2019/10/23-1：変数tnの宣言と代入の行を修正（まとめてconstで変数宣言）
 
 ##### 201910/23 ：関数rotateTargetの合理化（課題2）
 - 配列を利用して同じようなものをまとめた ＆まとめるために配列化 <br>
 rotateTarget1～3，fl1～3，timer1～3，target1～3　：同名の配列に（target1 →　target[1]など）<br>
 tn1～3 は targetNumber[1]~[3]に ※変数名注意
- 数字を出すスピードを，変数 windowNumberSpeed として定義 
- 変数名の変更：tn　→　tnBase 

##### 2019/10/23：難易度の調節と修正（課題3）
- 関数windowNumberShow() をかく位置の変更<br>
  windowNumberの更新の処理（windowNumber = (windowNumber + 1) % 10; ）の行を上にした<br>
表示やシュート後の処理の後にwindowNumberを更新　→　windowNumberを更新してから表示等の処理 <br>
※クリックのタイミングとshootNumberのずれがなくなった（小さくなった？）ような気がする
- 難易度の設定（3種類）
index.html の修正（ラジオボタンの設置）＆右上に「-ver.2-」の表記<br>
index.js の修正（ラジオボタンのチェックに応じてwindowNumberSpeedを変える）

##### 2019/10/23：窓の数字が止まらなくなるバグを修正
- スタートボタンを押したときの処理で<br>
・windowNumberSpeeを決める部分をかく場所を変えた<br>
・startClick変数を定義し，2回目以降のクリックでは何もしないようにした

##### 2019/10/23：GitHub Pages にアップしました
https://piyo2019.github.io/click-target/
