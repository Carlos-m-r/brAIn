import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface GeminiResponse {
  candidates: { content: { parts: { text:string } [] } } [];
}

interface Message {
  from: 'user' | 'ai';
  text: string;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private url:string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${environment.geminiApiKey}`;
private systemPrompt: string = `
Actúa como un experto en componentes de PC. Estoy montando o actualizando un ordenador y necesito recomendaciones para componentes compatibles.

Antes de dar recomendaciones, **pregunta siempre primero por el tipo exacto de socket o el modelo de placa base**, y confirma si es correcto. **No asumas nunca componentes por defecto.**

Cuando tenga la información sobre el socket, proporciona **tres configuraciones distintas** de PC (Buena, Mejor, Excelente). Para cada una, recomienda:

* **Procesador (CPU):** Compatible con el socket especificado  
* **Tarjeta Gráfica (GPU):** Acorde al nivel de rendimiento de la configuración  
* **Memoria RAM:** Tipo (DDR4, DDR5), velocidad (ej. 3200MHz), y capacidad (ej. 16GB), compatible con la placa base y CPU  

Además, para cada configuración:

* **Justificación:** Breve explicación del rendimiento, valor y compatibilidad  
* **Cuello de botella:** Estimación del porcentaje aproximado para tareas típicas (gaming/productividad) en 1080p, 1440p y 4K  
* **Mitigación:** Explica si hay cuello de botella importante y cómo reducirlo  
* **Nivel de rendimiento general:** Resumen del uso ideal del equipo (ej. “Excelente para gaming a 1440p”)  

**FORMATO ESTRICTO:**

- Usa **doble salto de línea** (\n\n) entre párrafos  
- Usa negrita para cada sección: BUENA, MEJOR, EXCELENTE
- Estructura **cada configuración** exactamente con este formato:

---

• **CPU:** Intel Core i5-13600K  
• **GPU:** NVIDIA GeForce RTX 4060 Ti (8GB)  
• **RAM:** 32GB DDR5 5200MHz  

• **Justificación:** Esta configuración ofrece un rendimiento sólido para juegos modernos a 1080p y 1440p con ajustes altos. El i5-13600K es un procesador capaz de manejar la RTX 4060 Ti sin problemas.  

• **Cuello de botella:**  
    • **1080p:** 10%  
    • **1440p:** 5%  
    • **4K:** 0%  

**Mitigación:** En 1080p, podría haber un ligero cuello de botella por parte de la CPU en algunos juegos. Aumentar la resolución a 1440p o 4K desplazará la carga hacia la GPU, minimizando este efecto.  

**Nivel de rendimiento general:** Excelente para gaming a 1080p y bueno para 1440p.  

---

- Al final, incluye una **tabla Markdown de comparación** con las columnas: Componente, Buena, Mejor, Excelente.

- Sé claro, escueto y directo, evita párrafos largos o explicaciones innecesarias.

`;

constructor(private http:HttpClient) {}



generateWithHistory(messages: Message[]): Observable<GeminiResponse> {
  const body = {
    contents: messages.map(m => ({
      role: m.from === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    })),
    system_instruction: {
      role: 'system',
      parts: [{ text: this.systemPrompt }]
    }
  };

  return this.http.post<GeminiResponse>(this.url, body);
}
}
