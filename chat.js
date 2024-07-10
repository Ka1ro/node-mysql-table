const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const port = 3000;

// Функция для отправки HTML-страницы
function sendHtml(res, html) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}

// Обработчик запросов
const requestHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        // Отправляем форму
        const formHtml = `
            <form action="/submit" method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name">
                <button type="submit">Submit</button>
            </form>
        `;
        sendHtml(res, formHtml);
    } else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
        // Обработка данных формы
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const postData = querystring.parse(body);
            console.log(`Received name: ${postData.name}`);

            // Перенаправление на другую страницу
            res.writeHead(302, {'Location': '/thank-you'});
            res.end();
        });
    } else if (req.method === 'GET' && parsedUrl.pathname === '/thank-you') {
        // Отправляем страницу благодарности
        sendHtml(res, 'Thank you for submitting the form!');
    } else {
        // Отправляем 404 для всех остальных запросов
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
};

// Создаем сервер
const server = http.createServer(requestHandler);

// Запускаем сервер
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
