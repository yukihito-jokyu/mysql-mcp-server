# MySQL MCP Server

MySQL データベースと連携するための Model Context Protocol (MCP) サーバーです。

## 開発環境

このプロジェクトは、VS Code DevContainers を使用して構築された、一貫性のある開発環境を提供します。

### 環境の概要

- **ベースイメージ**: `node:24-slim`
- **パッケージマネージャー**: `pnpm`
- **タスクランナー**: `task` (go-task)
- **シェル**: `zsh` (Oh My Zsh, autosuggestions, syntax-highlighting 導入済み)

### セットアップ手順

1.  **必須要件**:

    - Docker Desktop
    - Visual Studio Code
    - VS Code 拡張機能: [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2.  **開始方法**:

    - VS Code でこのプロジェクトフォルダを開きます。
    - 左下の緑色のアイコンをクリックするか、コマンドパレット (`Cmd+Shift+P`) を開き、「Dev Containers: Reopen in Container」を選択します。
    - 初回起動時はコンテナのビルドが行われるため、数分かかる場合があります。

3.  **拡張機能インストール方法(Antigravity の場合)**
    - 以下のコマンドから拡張機能をインストールする
    - `chmod +x .devcontainer/scripts/install_extensions.sh`
    - `./.devcontainer/scripts/install_extensions.sh`

### 利用可能なスクリプト

`package.json` に定義されている主なスクリプトは以下の通りです：

- `pnpm build`: TypeScript コードをコンパイルします。
- `pnpm dev`: 変更を監視して自動的にコンパイルします。
- `pnpm start`: コンパイルされたサーバーを起動します。

### タスクランナー (Taskfile)

このプロジェクトでは、タスクランナーとして `task` (go-task) を使用しています。以下のコマンドでタスクを実行できます。

- `task init`: 開発環境の初期化（VS Code 拡張機能のインストールなど）を行います。
- `task dev`: MCP Inspector を起動し、サーバーの動作検証を行います。
- `task run`: MCP Server を起動します。

### VS Code 拡張機能

開発効率を向上させるために、以下の拡張機能が自動的にインストールされます：

- **ESLint / Prettier**: コードの品質チェックとフォーマット
- **Git Graph**: Git 履歴の可視化
- **ErrorLens**: エラーのインライン表示
- **Pretty TypeScript Errors**: TypeScript エラーを見やすく表示
- **その他**: スペルチェック、インデントの可視化など

## ライセンス

MIT
