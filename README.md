# calendar-app

## Git コマンド

`git pull origin master`

master ブランチのコードをローカル環境に持ってきます。(注)master ブランチで実行してください。

`git switch -c [ブランチ名]`

ブランチを作成して、作ったブランチに移動します。

`git push origin [ブランチ名]`

今いるブランチのコードを GitHub に push します。

## 作業手順

- master ブランチに移動する。 `git switch master`

- GitHub の master ブランチをローカル環境に持ってくる。 `git pull origin master`

- 最新の master ブランチからブランチを作成する。
  `git switch -c [ブランチ名]`

- コードを書く

- Add する。(push したいコードを追加する) `git add .`

- commit する。(どのような変更を行ったかメッセージを書く) `git commit -c "[メッセージ]"`

- push する。(GitHub にコードを反映させる) `git push origin [今いるブランチ名]`

- プルリクエストを出す。(GitHub でクリックしてプルリクエストを出す。)

--終了--
