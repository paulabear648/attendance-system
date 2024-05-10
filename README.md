# attendance-system

## 起動方法

- npm run clean
  - データベースの中身の初期化を行う．
- npm run format
  - ファイルの中身を整形する．
- npm run lint
  - JavaScript コードの解析（--fix オプションなし）と整形を行う．
- npm run debug
  - いくつかのユーザを登録し，入退室ログも作成する．
- npm run build
  - ビルド（サーバーを立ちあげられるように）する．
- npm run start
  - ポート8080でサーバ（server.js）を起動する．
- npm run test
  - テストコード（testフォルダ内）の実行を行う．