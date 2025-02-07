import { NextResponse } from 'next/server';
import OpenAI from "openai";

// export async function GET(request) {
//     const openai = new OpenAI({
//         baseURL: 'https://api.deepseek.com',
//         apiKey: 'sk-1381102c9fc5415faf824d9d0c088cac',
//         dangerouslyAllowBrowser: true
//     });
//       async function main() {
//         const completion = await openai.chat.completions.create({
//         messages: [{ role: "system", content: "You are a helpful assistant." }],
//         model: "deepseek-chat",
//         });
//         const posts = completion.choices[0].message.content;
//         console.log(completion.choices[0].message.content);
//         return NextResponse.json(posts);
//       }
    
//       main();

// }





export async function GET(request, { params }) {
        const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-1381102c9fc5415faf824d9d0c088cac',
        dangerouslyAllowBrowser: true
    });
    //   async function main() {
    //     const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: "You are a helpful assistant." }],
    //     model: "deepseek-chat",
    //     });
    //     const posts = completion
    //     console.log(completion.choices[0].message.content);
    //     return NextResponse.json(posts);
    //   }
    //   main()
    // 调用示例
    const libre = require('libreoffice-convert');
const path = require('path');
const fs = require('fs').promises; // 使用 Promise 版本的 fs 模块

// async function ConvertDocToPdf() {
//     try {
//         console.log(__dirname);
//         // 定义输入文件路径
//         const inputPath = path.join(__dirname, "test.docx");
//         // 定义输出文件路径，避免使用以 / 开头的路径
//         const outputPath = path.join(__dirname, "test.pdf");

//         // 读取输入文件
//         const docData = await fs.readFile(inputPath, 'utf-8');

//         return new Promise((resolve, reject) => {
//             // 进行文件转换
//             libre.convert(docData, '.pdf', undefined, async (err, done) => {
//                 if (err) {
//                     // 拒绝 Promise 并带上具体错误信息
//                     reject(new Error(`Conversion failed: ${err.message}`));
//                     return;
//                 }
//                 try {
//                     // 将转换后的文件写入磁盘
//                     await fs.writeFile(outputPath, done);
//                     // 解析 Promise 并返回成功信息
//                     resolve("Conversion successful");
//                 } catch (writeErr) {
//                     // 写入文件失败时拒绝 Promise 并带上具体错误信息
//                     reject(new Error(`Failed to write output file: ${writeErr.message}`));
//                 }
//             });
//         });
//     } catch (err) {
//         // 读取输入文件失败时抛出错误
//         throw new Error(`Error in input reading: ${err.message}`);
//     }
// }
// ConvertDocToPdf()
// .then(result => {
//       console.log(result);
//       return NextResponse.json(result);
//   })
// .catch(error => {
//       console.error(error.message);
//       return NextResponse.error(error.message);
//   });

    const { locale } = params;
    const data = {
        message: `This is data for locale: ${locale}`,
        locale
    };
    return NextResponse.json(data);
}

// 处理 POST 请求的接口
export async function POST(req) {
    try {

        const url = new URL(req.url);
        const pathname = url.pathname;

        // if (pathname === '/api/upload') {

            if (req.method !== "POST") {
                return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
            }
            console.log(req)
            
            const file = req.files?.file;
            if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
            }
            
            const fileName = Date.now() + "-" + file.name;
            await file.mv(`./uploads/${fileName}`);
            
            res.status(200).json({ message: "File uploaded successfully" });

            return NextResponse.json({ message: "File uploaded successfully" }, { status: 200 });
        // }

        // 这里可以对请求体数据进行处理
        // const responseData = {
        //     message: 'This is a POST request response',
        //     receivedData: body
        // };
        // return NextResponse.json(responseData);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }
}