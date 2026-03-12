import db from "../database/db.js";

export function listarEstudos(usuarioId: any) {
  const stmt = db.prepare(`
    SELECT * FROM estudos 
    WHERE usuario_id = ?
    ORDER BY data ASC, hora ASC
  `);
  return stmt.all(usuarioId);
}

export function criarEstudo(usuarioId: any, materia: string, data: string, hora: string, descricao: string) {
  const stmt = db.prepare(`
    INSERT INTO estudos (usuario_id, materia, data, hora, descricao)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(usuarioId, materia, data, hora, descricao);
}