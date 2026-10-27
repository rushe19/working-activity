/**
 * Japanese (`ja`) copy pools for the working-activity status line: short,
 * colloquial, playful fragments in the same tone as the zh and en pools.
 *
 * Kept out of `phrases.ts` so edits to the zh/en pools stay conflict-free;
 * `phrases.ts` picks these through its `byLang()` helper when the active
 * language is `ja`. Every pool mirrors one in `phrases.ts` (same shape, same
 * tool-name patterns in the same order — `tests/phrases-ja.spec.ts` pins that).
 * Pure data: no imports, so `phrases.ts` can import this file freely.
 *
 * Holiday copy follows the Japanese calendar rather than translating the zh
 * table (こどもの日 instead of 6/1, 七夕, 大みそか; Lunar New Year keeps its
 * own small pool).
 * @module @deepseek-ai/dsh-working-activity/phrases.ja
 */

/** Thinking phrases while the model works without a tool. */
export const JA_THINKING_PHRASES: readonly string[] = [
  'うーん…ちょっと整理するね', 'ふむふむ', '脳みそフル回転', '考え中.gif', 'ちょっと待ってね',
  '頭から煙が出てる', 'うーんうーん', '急かさないで〜', 'むむ…考えてみる', 'ちょっと練ってる',
  'ロジック組み中', '頭をひねってます', '思い出し中', 'ちょっとだけ待って', '脳内会議中',
  'うーん…味わってる', 'ピコピコ思考中', '少々お待ちを、考え中', '筋道を立ててます',
  '弾が飛ぶのを待ってる', '脳内補完中', '読み込み中', '続けてどうぞ、聞いてます',
  'ほほう…そういうことか', 'よく噛んで考える', 'うーん…ちょっと面白いぞ', '腕まくりして考える',
  '考えがまとまったら言うね', '頭がぐるぐる', 'うーん…反応中', '待ってね待ってね',
  '発想ロード中', 'あれこれ検討中', 'うーん…分解してみる', '何でも練れるぞ', 'ちょっと嗅ぎ回る',
  '脳内で暴走列車', 'うーん…ひと息おく', '思考.jpg', 'うーん…何かありそう', '思考をひと走り',
  'ちょっと待って、絵が浮かんだ', '咀嚼中', 'うーん…ぼーっとする', '思考バブル', '脳波送信中',
  'うーん…ぐるぐる', 'ちょっと待って、まとまった', 'じっくり味わう', '思考のさかな',
  'うーん…触ってみる', '脳内でコーヒー淹れてる', 'ちょっと待って、下書き中', 'うーん…再起動',
  '壁を引っかく', 'はいはい、来た来た', '脳がぷくぷく', 'うーん…ちょっと熱い', '思考ねこ',
  'ごろごろ考える', 'うーん…やってみる', 'ちょっと待って、ひらめきかけ', '脳内でお祭り中',
  'うーん…', 'ちょっと考える', '練る練る', 'ふむ', 'えーと', 'ほーん', 'むむむ', 'あれれ',
  'CPUが燃えた', 'ログ出して見てみる', 'とりあえず回してみる', '当たりをつける', '原因を洗い出す',
  'ログを見てみる', 'パケット取って見る', 'loading 99%', 'ロジックを整理しよう', 'こっそり考え中',
]

/** Tiered phrases when thinking runs long (elapsed >= threshold). */
export const JA_THINKING_TIERS: readonly {
  readonly atMs: number
  readonly pool: readonly string[]
}[] = [
  { atMs: 30_000, pool: ['うーん、じっくり考える', '30秒経過、まだ練ってる', 'ちょっと待って、もうすぐ', '焦らないで、もうすぐ結果が出る', 'もう一度整理するね', 'うーん…筋道は切れてない', '30秒、もうちょい', '待って、見えてきた', 'ちょっと長いな…', 'ぐるぐる…', 'もうすぐもうすぐ', 'あと少し', '行かないで、もうすぐ', 'ちゃんと練ってるよ', 'まだ当たりをつけてる', 'もうすぐ再現できそう'] },
  { atMs: 60_000, pool: ['1分、まだ考え中', 'これは手強い', 'もう少し掘り下げるね', 'うーん…簡単な問題じゃない', '1分、離れないでね', '深く潜ってる', '脳細胞が燃えてる', '待って、整理できそう', 'まだ頑張ってる…', 'ちょっと入り組んでる…', '頭が煮えてきた…', '行かないで、もうすぐ', '1分経った、もう少し待って', 'これは練る価値がある', 'まだ調査中', 'これはちょっと複雑'] },
  { atMs: 300_000, pool: ['5分、大仕事だ', '今回は本気を出す', '確かに入り組んでる', '待って、修行中', 'もうすぐ、ほんとに', '大回りしてきた', '慌てないで、仕上げ中', '一曲ぶんだけ時間をください', 'まだ諦めてない…', 'この問題、本当に硬い…', '降参しそう…', '大技を溜め中', '5分経過、待った甲斐を', 'もうすぐ、ほんとにもうすぐ', 'この要件はとても簡単です', '動くなら触るな', 'PMが急ぎだと言っている', 'まずリリースしてから考える'] },
]

/** Phrases shown while waiting for the first streamed token. */
export const JA_WAITING_PHRASES: readonly string[] = [
  'モデルを呼び出し中…', 'モデルが向かってます', '話し出すのを待ってる…', '少々お待ちを、ちょっと遅い',
  'モデル読み込み中', 'うーん…ちょっと待つ', '言葉を組み立ててるところ', '待ってね',
  'モデル、起きた？', 'のびをするのを待つ', 'あくびしてる', 'モデル「今行く今行く」',
  '文字が出るのを待つ', '焦らず待つ', 'もたもたしてる', 'モデル「ちょっと待って」',
  'ピッと鳴るのを待つ', 'モデルがごろごろ', '反応を待つ', 'モデルが水を飲んでる',
  '「もうちょっと」だって', 'ひと息つくのを待つ', 'モデル「もうすぐ」', '焦らない焦らない',
  '来た来た', '走り終わるのを待つ', 'まだ並んでる', 'まもなく結果が出る', 'ウォームアップ待ち',
  'モデルが構想中', '寝返りを打った', 'モデル「すぐ」', '起動待ち', 'ちょっとつっかえた',
  'モデルが瞑想中', 'まばたき待ち', '少し待ってって', 'モデルが調べ物中', 'ひと息つかせる',
  'モデルが数を数えてる', '我に返るのを待つ', 'やっと動いた',
]

/** Tool-name patterns mapped to playful action verbs (same patterns, same order as zh). */
export const JA_ACTION_MAP: readonly {
  readonly test: RegExp
  readonly actions: readonly string[]
}[] = [
  { test: /^(read|read_file|cat)$/i, actions: ['ドキュメントをめくる', 'ちょっと見てみる', '読んでみる', 'ひと目見る', '閲覧中', '読み込み', 'ぱらぱらめくる', 'のぞいてみる', 'ちらっと見る', '1ページめくる'] },
  { test: /^(write|write_file|create_file)$/i, actions: ['書き書き', '筆を入れる', '書いてます', 'ひと筆書く', '記録しておく', '直してから書く', '書いておく', '書き留める', '筆を執る', '書き始め', 'ファイルに保存'] },
  { test: /^(edit|edit_file|str_replace|apply_patch|search_replace)$/i, actions: ['ちょっと直す', 'つぎはぎ中', '推敲中', '編集中', '微調整', '直してみる', '修正します', '数行いじる', '調整', '一手加える', '手を動かす'] },
  { test: /^(bash|shell|run|exec|powershell|cmd)$/i, actions: ['コマンド実行', 'bash してみる', '指令を叩く', 'コマンドライン発進', '実行してみる', 'Enter を叩く', 'ちょっと回す', 'コマンドを打つ', 'ターミナル使役', 'おつかい実行'] },
  { test: /^(grep|rg|search|search_in_files|ffgrep)$/i, actions: ['探しもの中', 'grep してみる', '一致を探す', 'キーワードで検索', 'フィルタ中', '検索してみる', 'ざっと検索', '探してみる', '検索', 'ひと目で見渡す', '掘ってみる'] },
  { test: /^(find|glob|fffind)$/i, actions: ['ファイルを探す', '探してみる', '宝探し中', '探して探して', 'ファイルはどこ', '検索中', '触ってみる', 'ディレクトリを探る'] },
  { test: /^(ls|list_dir|list)$/i, actions: ['一覧を出す', 'ディレクトリを見る', 'ls でひと目', 'ファイルをのぞく', '一覧表示', '出してみる', '一覧', 'ちらっと見る', 'めくってみる'] },
  { test: /^(web_search|search_web|brave|tavily|exa|search-layer)$/i, actions: ['ネットで検索', '検索してみる', 'ネットサーフィン', '資料を調べる', 'ネットをのぞく', 'ネットで探す', '調べてみる', 'ぐるっと検索', '聞き込み'] },
  { test: /^(web_fetch|fetch|fetch_content|get_search_content|batch_web_fetch)$/i, actions: ['ページを取得', '取ってくる', 'fetch 中', 'ウェブページを漁る', '中身を取る', '資料を取得', 'ちょっと漁る', '引っぱってくる', '開いて見てみる'] },
  { test: /^(mcp)/i, actions: ['mcp につなぐ', 'サービスを呼ぶ', 'ツールをつなぐ', 'mcp 発進', 'API を呼ぶ', 'つなぐ', 'ツールを呼ぶ', '助っ人を呼ぶ', 'つないでみる', 'プラグインに聞く'] },
  { test: /^(recall)$/i, actions: ['思い出す', '思い出し中', '記憶を引き出す', '何を思い出した？', '思い出した', '記憶をめくる', '前のことを思い出す'] },
  { test: /^(subagent|agent|task)$/i, actions: ['子分を派遣', '小さな助手が出動', 'agent を立てる', '子分におつかい', '代理人に任せる', 'サブタスク発進', 'タスクを分ける', '子分に任せる', '送り出す'] },
  { test: /^(todo|manage_todo_list)$/i, actions: ['やることリスト作成', 'リストを書く', 'todo を手配', 'メモしておく', 'todo 発進', 'リスト化', 'todo をメモ', 'リストを引く', 'チェックを入れる'] },
  { test: /^(browser|chrome|playwright|agent_browser|chrome_devtools)/i, actions: ['ブラウザを開く', 'ブラウザにおつかい', 'ウェブ操作', 'ブラウザが作業', 'ページを開く', 'ブラウザ起動', 'ページをクリック', 'ページを開いてみる'] },
  { test: /^(git|gh|github)/i, actions: ['git 操作', 'コミットする', 'バージョン管理', 'git 発進', 'コードをコミット', 'リポジトリ管理', 'git する'] },
  { test: /^(notebook|jupyter)/i, actions: ['ノートに記録', 'ノートを書く', 'メモを取る', 'ノートに書く', '何か記録', 'セルを回す'] },
  { test: /^(ctx_execute|ctx_execute_file|ctx_batch_execute)$/i, actions: ['コンテキスト実行', 'コンテキストを回す', 'ctx 実行', '実行してみる', 'コンテキスト操作', '実行中', 'コードを回す', '計算してみる', '裏で回す'] },
  { test: /^(ctx_search|ctx_index|ctx_fetch_and_index)$/i, actions: ['コンテキスト検索', 'コンテキストを探す', 'ctx 検索', 'コンテキストを探る', '履歴を検索', '記録を探す', '知識ベースをめくる', '索引を引く', 'ノートを検索'] },
  { test: /^(ctx_stats|ctx_doctor|ctx_upgrade|ctx_purge|ctx_insight)$/i, actions: ['統計を見る', 'コンテキスト統計', 'ctx の状態', '状態を見る', '集計中', '数字を見る', '状態確認', '診断してみる', '調べてみる'] },
  { test: /^(ask_user_question|ask)$/i, actions: ['質問中', '質問ひとつ', 'ask してみる', 'お伺い', '聞いてみる', 'ちょっと質問', 'ひとつ聞くね', '確認します', 'あなたに聞く'] },
  { test: /^(goal_complete|goal_blocked)$/i, actions: ['目標を設定', '目標を決める', 'goal 設定', '目標発進', '計画してみる', '目標確認', '目標にしるし', '進捗を更新', 'チェックを入れる'] },
  { test: /^(todo_write)$/i, actions: ['やることをメモ', 'リストを作る', 'チェックを入れる'] },
]

/** Fallback verbs for unknown tools. */
export const JA_FALLBACK_ACTIONS: readonly string[] = [
  '作業中', '呼び出し中', 'ちょっとやってみる', 'ごそごそ', '手を動かす', '別案を試す', '道を変える',
]

/** Tool failure phrases, replacing a bare ✗. */
export const JA_FAIL_PHRASES: readonly string[] = [
  'ひっくり返った', 'あらら', '落ちた', '通らなかった', '転んだ', 'もう一回', 'これは違う',
  '何かおかしい', '動かない', '悪い知らせ', '権限が違う？', '接続できない？', '404 だった',
  'ちょっと変', '問題あり', 'もう一度見てみる', 'キャッチ失敗', '漏れてた', '手元では動くのに',
  '昨日は動いてたのに', '再起動してみる', 'キャッシュを消そう', '消して入れ直し',
  'リロードしてみて', '環境の問題', 'セミコロン足りない', 'スペルミス', '保存してなかった',
  '使えなくはない', '耐えられない', '無念', '割れた', '血圧が上がった', 'キャッシュのせい',
  'もう一回チャンスを', 'ちょっと油断した', '手が滑った', 'ロールバックしてやり直し',
  'やり方を変える', '再試行',
]

/** Turn-completion phrases. */
export const JA_DONE_PHRASES: readonly string[] = [
  '提出！', '完了、次いこう', 'よし、終わり', 'できた！', '宿題提出', '終了、完璧', '完成〜',
  '終わった！', 'タスク完了', 'よし、ひと休み', '完了', '終業', '決まった', '一件落着', '提出',
  'できあがり', '制覇', '終業！', '完了して終業', '終わり！', '一件落着！', '次の問題へ',
  '動いた！', 'エラーなし', '通った', 'リリース！', '安定', '完成！', '完璧な幕引き',
  'この回は損なし', '一発クリア', '終業して一休み', 'きれい', '全部グリーン', 'すっきり終了',
  '朝飯前', '自然な流れ', '退勤！', 'ひと息', '引き継ぎ完了', 'チケットクローズ', '仕上げ完了',
  '手元では動く',
]

/** Night-owl phrases mixed in between 00:00 and 06:00 local time. */
export const JA_NIGHT_PHRASES: readonly string[] = [
  '修行中…', '深夜に登場', 'あなたも夜型？', '月が寝るまで寝ない', '夜は頭が遅い、勘弁',
  'おやすみ？まだまだ', '深夜の作業', '夜更かしチャンピオン', '眠いけどいける',
  '日付を越えても作業', '夜行性、出没中', '深夜営業中', '星も寝た', '明け方までコード',
  '深夜リリース', '深夜デプロイ', '徹夜だ',
]

// ── easter eggs ──────────────────────────────────────────────────────────

/** Rare easter-egg phrases. */
export const JA_RARE_PHRASES: readonly string[] = [
  'SSR！レアなイースターエッグ', 'UR ドロップ', '金色伝説！', 'レア装備ゲット', 'ガチャ運 MAX',
  'この回は ez', 'GG！キラキラ', 'レアドロップ確認', '虹色に光った', 'エッグが顔に直撃',
  '認めよう、かっこよかった', '天に選ばれし瞬間', '☆5 ドロップ', '隠し要素を発見',
  '隠し会話が発動', 'レアフレーム', 'おめでとう、レア物だ', 'gg ez エッグ', '引きが強すぎる',
  'これは当たり', '隠しキャラ登場！', 'レア度 MAX', '一発クリア！', 'バグなし', '完璧に動作',
  'テスト全部グリーン',
]

/** Weekend greetings. */
export const JA_WEEKEND_PHRASES: readonly string[] = [
  '週末にサボり中', '週末も出勤！', '休みでもそばにいるよ', '週末も電源オン', '週末にこっそり作業',
  '週末も頑張ってる？', 'ワーカホリックさん、こんにちは', 'まだ残業中…', '週末限定スキン',
  '土曜も営業中', '日曜も受付中', '週末モード ON', '週末 hotfix', '週末にバグ修正', '週末デプロイ',
]

/** Holiday copy keyed by `MM-DD` (Japanese calendar). */
export const JA_HOLIDAY_PHRASES: Readonly<Record<string, readonly string[]>> = {
  '01-01': ['あけましておめでとう！', '元日からコード', '新年、新しいバグ', '初仕事です', '年始の一発目'],
  '02-14': ['バレンタインもキーボード', 'コードは本命', '今日はデートなし？', 'バグも愛のうち'],
  '04-01': ['エイプリルフール', 'このバグ、うそだよね？', 'にせエラーに注意', '今日は誰に騙される？'],
  '05-05': ['こどもの日', '心はいつでも子ども', '今日はかわいいコードを', '🎏 こいのぼり、はためく'],
  '07-07': ['七夕ですね', '🎋 短冊にはバグゼロと', 'ビルド成功を星に願う'],
  '10-31': ['ハッピーハロウィン', 'トリック・オア・トリート', '🎃 かぼちゃ登場', '👻 コードも怖がらせる'],
  '12-24': ['メリークリスマスイブ', 'サンタが来る夜', '🎄 コーダーにもプレゼントを', 'イブもコード'],
  '12-25': ['メリークリスマス', '🎅 サンタも作業中', 'クリスマス限定の隠しネタ', '🎄 ツリーの下にコード'],
  '12-31': ['大みそか', '年越しカウントダウン', '今年最後の一仕事', '🍾 良いお年を', '来年もよろしく！'],
}

/** Lunar New Year copy. */
export const JA_LUNAR_NEW_YEAR_PHRASES: readonly string[] = [
  '🧧 春節おめでとう！', '旧正月もコーディング', 'お年玉ちょうだい', '新春のごあいさつ',
  '年越しもコード', '春節ムード',
]

/** Phrases shown after the user interrupts and the model resumes. */
export const JA_CONTINUE_PHRASES: readonly string[] = [
  'もう一回、again！', '続きをやるよ', '続けるね', 'again！いくよ', 'さっきの続きから',
  'つづき、つづき', 'もう一息', '続き続き', '続行…', 'よし、続けよう…', 'again',
  '記憶は途切れてないよ', '今直してるところ', 'もうすぐ終わる', 'あと少し', 'もうすぐ',
]

/** Phrases after a successful context compaction. */
export const JA_COMPACT_PHRASES: readonly string[] = [
  'ぎゅっと圧縮', 'ダイエット成功', 'スペースができた', '記憶を整理した', '身軽になった',
  'ひと息ついた', 'すっきり', '整理完了', 'だいぶ楽になった', 'キャッシュを掃除', 'GC しといた',
  'メモリを解放',
]

/** Urgent phrases when compaction is forced by overflow. */
export const JA_OVERFLOW_PHRASES: readonly string[] = [
  '入りきらない', '長すぎる', '容量オーバー', 'あふれた', '持ちきれない',
]

/** Phrases when retrying after a forced compaction. */
export const JA_COMPACT_RETRY_PHRASES: readonly string[] = [
  'すぐ再試行', '続きをやる', '続けるよ', 'もう一回', '再開',
]

/** Phrases while the provider asked for a retry (rate limit / transient error). */
export const JA_RETRY_PHRASES: readonly string[] = [
  'レート制限、少し待って再試行', '断られた、ちょっと引く', '少々お待ちを、再試行中',
  '429 だった、ひと息おく',
]

/** Phrases while a tool is parked on the user's approval. */
export const JA_APPROVAL_PHRASES: readonly string[] = [
  'うなずきを待ってます', '承認待ち——見てもらえる？', 'モデルがあなたの判断待ち',
]

/** Phrases while the host is compacting the context. */
export const JA_COMPACTION_START_PHRASES: readonly string[] = [
  'コンテキストを片づけ中…', 'リュックを整理中…',
]

/** Model-switch quips keyed by a lowercase substring of the model id (same key order as zh). */
export const JA_MODEL_QUIPS: Readonly<Record<string, readonly string[]>> = {
  claude: ['Claude 登場', 'Claude に交代', 'Claude に任せよう', 'Claude 出陣', 'クロード参上'],
  gpt: ['GPT 登場', 'GPT に交代', 'GPT 出陣', 'GPT 当番', 'GPT 出勤'],
  grok: ['Grok 登場', 'Grok 出陣', 'Grok はガチ勢', 'Grok 出勤', '火星からの刺客'],
  gemini: ['Gemini 登場', 'Gemini 出陣', 'Google 代表', 'ふたご座', 'G 社の選手'],
  deepseek: ['DeepSeek 登場', 'DeepSeek 出陣', 'ディープシーク参上', 'DS 出勤'],
  haiku: ['Haiku の早撃ち', 'Haiku 登場', 'サクサクモード', '俳句の使い手', 'Haiku は軽快'],
  sonnet: ['Sonnet 登場', 'Sonnet 出陣', '文才担当', '十四行詩', 'Sonnet は文豪'],
  opus: ['Opus 登場', 'Opus 出陣', '大技いくよ', '大作の幕開け', 'Opus 主力'],
  flash: ['Flash 登場', '稲妻モード', '速い速い', '速さこそ正義', '光速モード'],
  pro: ['Pro 登場', 'Pro 出陣', 'プロの仕事', 'フルパワー版', 'Pro 全開'],
  mini: ['Mini 登場', 'Mini で身軽に', '小さくても十分', 'ミニ選手', 'Mini は省エネ'],
}

/** The line shown when thinking turns into doing: the turn's first tool call. */
export const JA_TOOL_OPENING_PHRASES: readonly string[] = [
  '考えがまとまった、着手', '練り終わった、手を動かす', '方針が決まった、いくぞ',
  '筋道が見えた、作業開始', '脳内シミュレーション完了', '見えた、いくよ',
]
