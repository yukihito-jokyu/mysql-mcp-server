# MySQL MCP Server

MySQL データベースのスキーマ情報とサンプルデータへの**読み取り専用**アクセスを提供する Model Context Protocol (MCP) サーバーです。

## 背景

既存の MySQL MCP サーバー([designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server) など)は、LLM に任意の SQL クエリを生成・実行させることができます。これには INSERT、UPDATE、DELETE などのデータ変更操作も含まれます。しかし、バックエンド実装時にはこのようなアプローチはリスクを伴います。

**この MCP サーバーは、より安全な異なるアプローチを採用しています:**

- ✅ **読み取り専用操作**: テーブル一覧、スキーマ情報、サンプルデータの取得のみ
- ❌ **書き込み操作なし**: データの変更、追加、削除は一切行いません
- 🎯 **バックエンド開発に特化**: データ破損のリスクなく、バックエンド実装に必要な情報のみを提供

バックエンドアプリケーションを開発する際、通常はデータベース構造を理解するだけで十分です。このサーバーは以下を提供します:

1. **テーブル一覧**: データベース内のすべてのテーブルを取得
2. **スキーマ情報**: 特定のテーブルの詳細なスキーマを取得
3. **サンプルデータ**: 検証用に任意のテーブルから先頭 5 行を取得

## 特徴

- 🔒 **設計段階から安全**: 読み取り専用操作により、誤ったデータ変更を防止
- 🚀 **簡単なセットアップ**: CLI 引数による簡単な設定
- 📊 **3つの必須ツール**:
  - `list_tables`: データベース内のすべてのテーブル一覧を取得
  - `get_table_schema`: 特定のテーブルのスキーマ情報を取得
  - `get_table_data`: テーブルから最大 5 行のサンプルデータを取得

## インストール

```bash
npm install @yukihito/mysql-mcp-server
```

または

```bash
pnpm add @yukihito/mysql-mcp-server
```

## 使用方法

### MCP サーバーとして使用

MCP クライアント(Claude Desktop、Cline など)でこのサーバーを使用するように設定します:

```json
{
  "mcpServers": {
    "mysql": {
      "command": "npx",
      "args": [
        "@yukihito/mysql-mcp-server",
        "--host", "localhost",
        "--port", "3306",
        "--name", "your_username",
        "--password", "your_password",
        "--database", "your_database"
      ]
    }
  }
}
```

### CLI オプション

| オプション | 説明 | デフォルト値 |
|--------|-------------|---------|
| `--host` | MySQL ホスト | `localhost` |
| `--port` | MySQL ポート | `8080` |
| `--name` | データベースユーザー名 | `admin` |
| `--password` | データベースパスワード | `root` |
| `--database` | データベース名 | `database` |

### Claude Desktop の設定例

Claude Desktop の設定ファイルを編集します:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mysql": {
      "command": "npx",
      "args": [
        "@yukihito/mysql-mcp-server",
        "--host", "localhost",
        "--port", "3306",
        "--name", "myuser",
        "--password", "mypassword",
        "--database", "mydb"
      ]
    }
  }
}
```

## 利用可能なツール

### 1. list_tables

接続されたデータベース内のすべてのテーブル一覧を取得します。

**入力**: なし

**出力**: テーブル名の JSON 配列

**例**:
```json
["users", "products", "orders", "categories"]
```

### 2. get_table_schema

特定のテーブルの詳細なスキーマ情報を取得します。

**入力**:
- `tableName` (string): テーブル名

**出力**: カラム情報(名前、型、NULL 許可、キー、デフォルト値、追加情報)を含む JSON 配列

**例**:
```json
[
  {
    "Field": "id",
    "Type": "int",
    "Null": "NO",
    "Key": "PRI",
    "Default": null,
    "Extra": "auto_increment"
  },
  {
    "Field": "name",
    "Type": "varchar(255)",
    "Null": "NO",
    "Key": "",
    "Default": null,
    "Extra": ""
  }
]
```

### 3. get_table_data

検証目的で特定のテーブルから最大 5 行を取得します。

**入力**:
- `tableName` (string): テーブル名

**出力**: 行オブジェクトの JSON 配列(最大 5 行)

**例**:
```json
[
  {"id": 1, "name": "John Doe", "email": "john@example.com"},
  {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
]
```

## 開発

開発環境のセットアップと貢献ガイドラインについては、[DEVELOPMENT.md](./DEVELOPMENT.md) を参照してください。

## ライセンス

MIT

## 作者

Yukihito

## 関連プロジェクト

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server) - 完全なクエリ実行機能を持つ代替 MySQL MCP サーバー
