import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'simpleMarkdown',
  standalone: true
})
export class SimpleMarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return value;

    let html = value
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Detectar bloques de tabla
    const lines = value.split(/\r?\n/);
    const tableStart = lines.findIndex(l => /^\s*\|.+\|\s*$/.test(l));
    if (tableStart >= 0 && lines[tableStart + 1]?.match(/^\s*\|[-\s|:]+\|\s*$/)) {
      const header = lines[tableStart].trim().slice(1, -1).split('|').map(h => h.trim());
      const rows = [];
      for (let i = tableStart + 2; i < lines.length && /^\s*\|.+\|\s*$/.test(lines[i]); i++) {
        rows.push(lines[i].trim().slice(1, -1).split('|').map(c => c.trim()));
      }

      let tbl = '<table><thead><tr>';
      header.forEach(h => tbl += `<th>${h}</th>`);
      tbl += '</tr></thead><tbody>';
      rows.forEach(r => {
        tbl += '<tr>';
        r.forEach(c => tbl += `<td>${c}</td>`);
        tbl += '</tr>';
      });
      tbl += '</tbody></table>';

      html = html.replace(
        lines.slice(tableStart, tableStart + 2 + rows.length).join('\n'),
        tbl
      );
    }

    // Saltos de línea dobles → párrafos
    html = html.replace(/\n{2,}/g, '</p><p>');

    // Saltos de línea simples → <br>
    html = `<p>${html.replace(/\n/g, '<br>')}</p>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
