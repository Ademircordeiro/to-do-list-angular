# 📝 Lista de Tarefas (To-Do List) em Angular

Aplicação moderna e responsiva de Lista de Tarefas desenvolvida com **Angular**, organizada em componentes modulares e utilizando **Signals** para gerenciamento de estado reativo.

---

## ✨ Funcionalidades

- ➕ **Adicionar Tarefas**: Criação rápida com título, seleção de prioridade (*Baixa*, *Média*, *Alta*) e categoria (*Geral, Estudos, Trabalho, Pessoal* ou personalizada).
- ✅ **Concluir Tarefas**: Marcação com checkbox interativo e estilo visual de concluído (tachado com opacidade reduzida).
- 🗑️ **Remover Tarefas**: Exclusão individual de tarefas com um clique e opção de limpar todas as concluídas.
- ✏️ **Edição Rápida**: Edição de títulos com clique duplo ou botão de edição (atalhos `Enter` para salvar e `Esc` para cancelar).
- 🔍 **Filtros e Busca**:
  - Filtro por abas: *Todas*, *Pendentes* e *Concluídas*.
  - Busca em tempo real por título ou categoria.
- 📊 **Métricas e Progresso**: Barra de progresso percentual e contadores de tarefas (Total, Pendentes e Concluídas).
- 💾 **Persistência Local**: Salva automaticamente no `localStorage` do navegador.

---

## 🏗️ Estrutura de Componentes

A aplicação foi organizada seguindo boas práticas de modularização do Angular:

```text
src/app/
├── components/
│   ├── header/          # Cabeçalho com métricas, data atual e barra de progresso
│   ├── task-form/       # Formulário para adição de novas tarefas com prioridade e categoria
│   ├── task-filter/     # Barra de busca, filtros de status (Todas, Pendentes, Concluídas) e limpeza
│   ├── task-item/       # Card individual da tarefa com alternância, edição e remoção
│   └── task-list/       # Container da lista de tarefas e exibição de estado vazio (empty state)
├── models/
│   └── task.model.ts    # Interfaces TypeScript (Task, TaskPriority, TaskFilter)
├── services/
│   ├── task.service.ts  # Gerenciamento de estado reativo com Signals e localStorage
│   └── task.service.spec.ts # Testes unitários do serviço
├── app.ts               # Componente raiz da aplicação
├── app.html             # Layout principal
├── app.css              # Estilos do layout
└── app.spec.ts          # Testes unitários do componente raiz
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v24 recomendado)
- NPM

### Passos

1. **Instalar as dependências** (caso ainda não tenha instalado):
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm start
   # ou
   ng serve
   ```

3. Abra o navegador em:
   ```
   http://localhost:4200/
   ```

---

## 🧪 Como Rodar os Testes

Execute a suíte de testes unitários com o Vitest:

```bash
npm test -- --watch=false
```

---

## 📦 Gerar Build de Produção

```bash
npm run build
```

Os artefatos gerados ficarão disponíveis no diretório `dist/to-do-list-angular/`.
