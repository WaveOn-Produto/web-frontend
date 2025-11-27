# 📋 DOCUMENTAÇÃO PARA INTEGRAÇÃO BACKEND - SISTEMA DE AGENDAMENTOS

## 🎯 **RESUMO GERAL**

O frontend está preparado para integrar com APIs que gerenciem agendamentos de lavagem de carros. O sistema implementa regras de negócio específicas e está aguardando integração com o backend.

---

## 🔗 **ROTAS NECESSÁRIAS**

### 1. **GET /api/pricing/:serviceType/:category**

**Descrição:** Buscar preço específico por tipo de serviço e categoria de veículo

**Parâmetros:**

- `serviceType`: string ("Lavagem Simples" | "Lavagem Completa")
- `category`: string ("Hatch" | "Sedan" | "SUV" | "Pickup")

**Resposta Esperada:**

```json
{
  "price": "50,00",
  "currency": "BRL"
}
```

**Função Frontend Preparada:**

```tsx
const fetchPriceByCategory = async (category: string, serviceType: string) => {
  // Implementar chamada para API
  // Atualmente: simulação com preços fixos
};
```

---

### 2. **GET /api/available-slots/:date**

**Descrição:** Buscar horários disponíveis para uma data específica

**Parâmetros:**

- `date`: string (formato: "YYYY-MM-DD")

**Regras de Negócio:**

- ✅ Respeitar intervalo mínimo de 4 horas entre lavagens
- ✅ Não permitir agendamentos no dia atual
- ✅ Limitar agendamentos aos próximos 7 dias

**Resposta Esperada:**

```json
{
  "date": "2025-11-28",
  "availableSlots": ["08:00", "10:00", "14:00", "16:00"],
  "bookedSlots": ["09:00", "15:00"],
  "rules": {
    "minIntervalHours": 4,
    "maxAdvanceDays": 7
  }
}
```

**Função Frontend Preparada:**

```tsx
const getAvailableTimeSlots = (date: string) => {
  // Implementar chamada para API
  // Atualmente: simulação com regra de 4h implementada
  // Lógica de conflitos já implementada no frontend
};
```

---

### 3. **POST /api/appointments**

**Descrição:** Criar novo agendamento

**Payload Enviado:**

```json
{
  "serviceType": "Lavagem Simples",
  "date": "2025-11-28",
  "time": "10:00",
  "vehicleCategory": "Sedan",
  "price": "50,00",
  "customerInfo": {
    // Dados do cliente (se logado)
  }
}
```

**Resposta Esperada:**

```json
{
  "id": "uuid-do-agendamento",
  "status": "confirmed",
  "appointmentDetails": {
    "serviceType": "Lavagem Simples",
    "date": "2025-11-28",
    "time": "10:00",
    "vehicleCategory": "Sedan",
    "finalPrice": "50,00"
  },
  "confirmationCode": "ABC123"
}
```

**Função Frontend Preparada:**

```tsx
const handleSubmit = (e: React.FormEvent) => {
  // Validação já implementada
  // Estrutura pronta para envio à API
};
```

---

## 📝 **ESTRUTURAS DE DADOS**

### **Estados do Frontend:**

```tsx
const [selectedDate, setSelectedDate] = useState(""); // "2025-11-28"
const [selectedTime, setSelectedTime] = useState(""); // "10:00"
const [selectedCategory, setSelectedCategory] = useState(""); // "Sedan"
const [availableSlots, setAvailableSlots] = useState<string[]>([]); // ["08:00", "10:00"]
const [currentPrice, setCurrentPrice] = useState(preco); // "50,00"
```

### **Dados dos Serviços (atuais):**

```tsx
const services = [
  {
    name: "Lavagem Simples",
    description: "Externa + Aspiração interna",
    basePrice: "50,00",
  },
  {
    name: "Lavagem Completa",
    description: "Interna + Externa + Pretinho",
    basePrice: "80,00",
  },
];
```

### **Categorias de Veículos:**

```tsx
const categories = ["Hatch", "Sedan", "SUV", "Pickup"];
```

---

## ⚙️ **REGRAS DE NEGÓCIO IMPLEMENTADAS**

### 🕐 **Regra de 4 Horas Entre Lavagens**

- **Lógica:** Se há um agendamento às 09:00, bloqueia horários de 05:00 às 13:00
- **Implementação:** Função `parseTime()` converte horários e calcula diferenças
- **Status:** ✅ Implementada no frontend, aguarda dados reais da API

### 📅 **Regra dos 7 Dias**

- **Lógica:** Apenas próximos 7 dias disponíveis (excluindo hoje)
- **Implementação:** Cálculo automático no calendário
- **Status:** ✅ Implementada no frontend

### 💰 **Preços Dinâmicos por Categoria**

- **Lógica:** Preço muda baseado na categoria do veículo
- **Implementação:** Estado `currentPrice` atualiza automaticamente
- **Status:** ✅ Interface pronta, aguarda API

---

## 🎨 **COMPORTAMENTOS VISUAIS IMPLEMENTADOS**

### **Calendário:**

- ✅ Navegação entre meses
- ✅ Estados visuais (hoje, passado, disponível, bloqueado, selecionado)
- ✅ Responsivo

### **Seleção de Horários:**

- ✅ Select dropdown (mudou de botões para dropdown)
- ✅ Desabilitado até selecionar data
- ✅ Mensagens informativas sobre regra de 4h

### **Preços:**

- ✅ Atualização em tempo real
- ✅ "A partir de" vs preço específico
- ✅ Feedback visual da categoria selecionada

---

## 🔄 **FLUXO COMPLETO DE INTEGRAÇÃO**

### **1. Usuário Seleciona Data:**

```tsx
// Frontend chama:
GET / api / available - slots / 2025 - 11 - 28;

// Backend retorna horários respeitando regra de 4h
// Frontend atualiza availableSlots[]
```

### **2. Usuário Seleciona Categoria:**

```tsx
// Frontend chama:
GET /api/pricing/Lavagem Simples/Sedan

// Backend retorna preço específico
// Frontend atualiza currentPrice
```

### **3. Usuário Confirma Agendamento:**

```tsx
// Frontend envia:
POST / api / appointments;
{
  serviceType, date, time, vehicleCategory, price;
}

// Backend processa e confirma
// Frontend redireciona ou mostra sucesso
```

---

## 🛠 **PRÓXIMOS PASSOS PARA O BACKEND**

### **Banco de Dados:**

1. Tabela `appointments` (id, service_type, date, time, vehicle_category, price, customer_id, status)
2. Tabela `pricing` (service_type, vehicle_category, price)
3. Tabela `business_rules` (min_interval_hours, max_advance_days)

### **Validações Necessárias:**

1. ✅ Verificar se horário está disponível
2. ✅ Aplicar regra de 4 horas entre agendamentos
3. ✅ Validar se data está dentro dos próximos 7 dias
4. ✅ Verificar se não é agendamento no passado

### **Endpoints Críticos:**

1. `GET /api/available-slots/:date` - **PRIORIDADE ALTA**
2. `GET /api/pricing/:serviceType/:category` - **PRIORIDADE ALTA**
3. `POST /api/appointments` - **PRIORIDADE ALTA**


