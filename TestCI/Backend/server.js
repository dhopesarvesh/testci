const express = require('express');
const app = express();
const PORT = 5001;
const cors = require('cors');

app.use(cors());
app.get('/api/message', (req, res) => {
  res.json({ message: "Hello from the backend via CI/CD pipeline!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
