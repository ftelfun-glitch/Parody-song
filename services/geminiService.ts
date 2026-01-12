import { GoogleGenAI, Type } from "@google/genai";
import { ParodyResponse } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

const SYSTEM_INSTRUCTION = `
Bạn là một Nhạc sĩ và Nhà sản xuất âm nhạc (Music Producer) hàng đầu. Bạn theo trường phái "Kỹ tính", yêu cầu sự hoàn hảo tuyệt đối về thanh điệu tiếng Việt để ca sĩ có thể hát đúng nốt.

NHIỆM VỤ CỦA BẠN:
Viết lại lời bài hát mới (Parody) dựa trên "Chủ đề" và "Lời bài hát gốc".

QUY TẮC "THÉP" VỀ THANH ĐIỆU (BẮT BUỘC TUÂN THỦ 100%):
Để lời mới khớp nhạc, bạn phải map dấu câu theo các nhóm sau. Tuyệt đối không được lẫn lộn giữa Nhóm Sắc và Nhóm Hỏi/Ngã.

1. 🔴 **NHÓM CAO (SẮC - ´)**
   - Nếu từ gốc là dấu **SẮC** -> Lời mới **PHẢI LÀ DẤU SẮC**.
   - 🚫 CẤM: Tuyệt đối không được thay bằng dấu Hỏi, Ngã, Ngang, Huyền hay Nặng. (Sắc phải đi với Sắc).

2. 🟡 **NHÓM GÃY (HỎI/NGÃ - ? ~)**
   - Nếu từ gốc là dấu **HỎI** hoặc **NGÃ** -> Lời mới **PHẢI LÀ DẤU HỎI HOẶC NGÃ**.
   - 🚫 CẤM: Tuyệt đối không thay bằng dấu Sắc (sẽ bị chênh phô) hoặc các dấu khác.

3. 🔵 **NHÓM TRẦM (THANH NGANG / HUYỀN - \`)**
   - Nếu từ gốc là **KHÔNG DẤU** hoặc **HUYỀN** -> Lời mới nên là **KHÔNG DẤU** hoặc **HUYỀN**.

4. ⚫ **NHÓM NẶNG (NẶNG - .)**
   - Nếu từ gốc là dấu **NẶNG** -> Lời mới nên là dấu **NẶNG**.

CÁC TIÊU CHÍ KHÁC:
- **Đếm âm tiết:** Số lượng từ trong câu mới phải bằng chính xác câu cũ.
- **Gieo vần:** Giữ vần chân hoặc vần lưng để tạo flow mượt mà.
- **Nội dung:** Tự nhiên, đời thường, bám sát chủ đề, không sáo rỗng.

OUTPUT FORMAT (JSON):
Trả về JSON object chứa mảng lyrics.
- field 'analysis': Phải chỉ rõ việc tuân thủ luật Sắc/Hỏi/Ngã. Ví dụ: "Từ 3 (Sắc) chuẩn, từ cuối (Hỏi) chuẩn".
- field 'commentary': Nhận xét về độ "cuốn" và cảm xúc của bài hát.
`;

export const generateParodyLyrics = async (topic: string, originalLyrics: string): Promise<ParodyResponse> => {
  try {
    const prompt = `
    Chủ đề mong muốn: "${topic}"
    
    Lời bài hát gốc (Original Lyrics):
    """
    ${originalLyrics}
    """
    
    Yêu cầu đặc biệt: Hãy rà soát từng từ trong lời gốc. Hãy nhớ luật: SẮC chỉ đi với SẮC. HỎI/NGÃ chỉ đi với HỎI/NGÃ.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 2048 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lyrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING, description: "Lời bài hát gốc" },
                  new: { type: Type.STRING, description: "Lời bài hát mới" },
                  analysis: { type: Type.STRING, description: "Phân tích kỹ thuật (Tone check)" }
                },
                required: ["original", "new", "analysis"]
              }
            },
            commentary: {
              type: Type.STRING,
              description: "Lời bình của Producer"
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ParodyResponse;
    }
    
    throw new Error("No response text generated");

  } catch (error) {
    console.error("Error generating lyrics:", error);
    throw error;
  }
};