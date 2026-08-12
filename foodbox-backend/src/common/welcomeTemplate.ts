// HTML Template for Backend Welcome Landing Page
export const welcomeTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Food Box POS Backend Server</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      text-align: center;
      background-color: #1e293b;
      padding: 3rem;
      border-radius: 1rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
      border: 1px solid #334155;
      max-width: 500px;
      width: 90%;
    }
    h1 {
      color: #f97316;
      margin: 0 0 1rem 0;
      font-size: 2.2rem;
    }
    p {
      color: #94a3b8;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }
    .btn {
      display: inline-block;
      background-color: #f97316;
      color: white;
      padding: 0.85rem 1.75rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: background-color 0.2s, transform 0.1s;
    }
    .btn:hover {
      background-color: #ea580c;
    }
    .btn:active {
      transform: scale(0.98);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Food Box Backend</h1>
    <p>The Food Box Cloud POS backend server is running successfully.</p>
    <a href="/api/docs/" class="btn">Open Swagger API Docs</a>
  </div>
</body>
</html>
`;
