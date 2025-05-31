import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;
const TARGET_API = process.env.VITE_SERVER_URL;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/process-checkout", async (req, res) => {
    try {
        const orderData = req.body;
        console.log("Recebendo requisição...", req.body);
        console.log("URL da API alvo:", TARGET_API);
        // Envia os dados ao backend externo
        const response = await fetch(`${TARGET_API}checkout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        res.status(response.status).json(result); // Retorna a resposta do backend para o navegador

    } catch (error) {
        console.error("Erro ao processar checkout:", error);
        res.status(500).json({ error: "Erro ao processar pedido" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy rodando em http://localhost:${PORT}`);
});
