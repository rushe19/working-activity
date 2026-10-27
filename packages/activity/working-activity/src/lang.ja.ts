/**
 * Japanese (`ja`) copy for the structural strings of the working-activity
 * status line and the `⏵` narration contract.
 *
 * Kept out of `lang.ts` so edits to the zh/en dictionary stay conflict-free:
 * `t()` reads this table when the active language is `ja` and falls back to the
 * English entry for a key it does not carry. `tests/lang-ja.spec.ts` requires
 * every dictionary key to be present here with the same `{{placeholders}}`.
 *
 * The playful pools live in `phrases.ja.ts`.
 * @module @deepseek-ai/dsh-working-activity/lang.ja
 */

export const JA_TEXT: Readonly<Record<string, string>> = {
  // ── ⏵ self-narration contract (system prompt) ───────────────────────
  'narrate-instruction':
    '[ステータス行] ユーザーに表示されるステータス行があります。【必須】各ステップ/サブタスクの開始時（ツール呼び出しの前だけでなく）、返信本文の先頭に単独で1行書いてください: ⏵ 今やっている具体的なこと（全角20字以内）。その後は改行して通常どおり返信を続けます。返信全体で ⏵ の行は1行だけにし、繰り返さないでください。情報を優先し、ひと目で何をしているか分かるように。文体は自然で、少し遊び心があっても構いません。例: ⏵ ログインページのスタイルを修正、⏵ エラーの原因を調査、⏵ パッチの検証を実行。タスクが切り替わったら必ず更新してください。',

  // ── status-line structural copy ─────────────────────────────────────
  'waiting-label': 'モデルの応答待ち',
  'thinking-label': '思考中',
  'line-elapsed': '合計 {{elapsed}}',
  'done-prefix': '完了 ✓',
  'done-summary': '{{tools}} · 思考 {{thinking}} 作業 {{tooling}}',
  'tool-count-one': '{{count}} ツール',
  'tool-count-many': '{{count}} ツール',
  'tool-streak': 'ツール×{{count}}',
  'tool-waiting-approval': '承認待ち',
  'subagent-count': 'サブエージェント {{count}} 個',
  'work-remind': '{{hours}} 時間ぶっ通しで作業中です。ひと休みしませんか？',
}
