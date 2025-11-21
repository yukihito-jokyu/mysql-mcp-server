# 開発ガイド

このドキュメントは、MySQL MCP Server プロジェクトの開発環境と貢献ガイドラインについての情報を提供します。

## 開発環境

このプロジェクトは、VS Code DevContainers を使用して一貫性のある開発環境を提供します。

### 環境の概要

- **ベースイメージ**: `node:24-slim`
- **パッケージマネージャー**: `pnpm`
- **タスクランナー**: `task` (go-task)
- **シェル**: `zsh` (Oh My Zsh、autosuggestions、syntax-highlighting 導入済み)

### セットアップ手順

1. **必須要件**:

   - Docker Desktop
   - Visual Studio Code
   - VS Code 拡張機能: [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **開始方法**:

   - VS Code でこのプロジェクトフォルダを開きます
   - 左下の緑色のアイコンをクリックするか、コマンドパレット (`Cmd+Shift+P`) を開き、「Dev Containers: Reopen in Container」を選択します
   - 初回起動時はコンテナのビルドが行われるため、数分かかる場合があります

3. **拡張機能インストール方法(Antigravity の場合)**:
   - 以下のコマンドから拡張機能をインストールする
   - `chmod +x .devcontainer/scripts/install_extensions.sh`
   - `./.devcontainer/scripts/install_extensions.sh`

### 利用可能なスクリプト

`package.json` に定義されている主なスクリプト:

- `pnpm build`: TypeScript コードをコンパイルします
- `pnpm dev`: 変更を監視して自動的にコンパイルします
- `pnpm start`: コンパイルされたサーバーを起動します

### タスクランナー (Taskfile)

このプロジェクトでは、タスクランナーとして `task` (go-task) を使用しています。以下のコマンドでタスクを実行できます:

- `task init`: 開発環境の初期化(VS Code 拡張機能のインストールなど)を行います
- `task dev`: MCP Inspector を起動し、サーバーの動作検証を行います
- `task run`: MCP Server を起動します

### VS Code 拡張機能

開発効率を向上させるために、以下の拡張機能が自動的にインストールされます:

- **ESLint / Prettier**: コードの品質チェックとフォーマット
- **Git Graph**: Git 履歴の可視化
- **ErrorLens**: エラーのインライン表示
- **Pretty TypeScript Errors**: TypeScript エラーを見やすく表示
- **その他**: スペルチェック、インデントの可視化など

## プロジェクト構造

```
mysql-mcp-server/
├── src/
│   ├── index.ts           # メインサーバーエントリーポイント
│   └── lib/
│       ├── connect.ts     # データベース接続ロジック
│       └── database.ts    # データベース操作関数
├── dist/                  # コンパイル出力
├── .devcontainer/         # DevContainer 設定
├── package.json
├── tsconfig.json
└── Taskfile.yml
```

## 貢献

貢献を歓迎します! 以下のガイドラインに従ってください:

1. リポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

## テスト

MCP サーバーをローカルでテストするには:

1. プロジェクトをビルド: `pnpm build`
2. MCP Inspector を使用: `task dev`
3. 3つの利用可能なツールをテスト:
   - `list_tables`
   - `get_table_schema`
   - `get_table_data`

## 公開

このパッケージは npm に公開されます。新しいバージョンを公開するには:

1. `package.json` のバージョンを更新
2. プロジェクトをビルド: `pnpm build`
3. 公開: `pnpm publish`

`prepublishOnly` スクリプトが公開前に自動的にビルドを実行します。

## ライセンス

MIT
