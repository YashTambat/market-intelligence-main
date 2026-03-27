# Frontend Practical Assessment (2 Hours)

:pushpin: Overview

This repository contains a partially implemented **Market Intelligence Dashboard** application built using:

*   **Framework**: React + Vite
*   **Language**: TypeScript
*   **State Management**: Redux Toolkit
*   **Styling**: Tailwind CSS
*   **Data Fetching**: Axios
*   **Charts**: Recharts
*   **Icons**: Lucide React

The application includes a dashboard table view, real-time activity logs, and trend charts. It aggregates data from multiple public APIs.

However, the codebase has accumulated significant "technical debt," and several bugs have been reported.

:hourglass_flowing_sand: Time Limit

You have 2 hours to complete this assessment.
Focus on:
- Correctness
- Clean implementation
- Proper state handling
Avoid over-engineering.

:hammer_and_wrench: Setup Instructions

:one: Install dependencies
```bash
npm install
```

:two: Run frontend
```bash
npm run dev
```

:globe_with_meridians: API Information

This application aggregates data from multiple public APIs:
- **DummyJSON**: For product inventory and category data. (https://dummyjson.com)
- **RandomUser**: For simulating real-time user activity logs. (https://randomuser.me)
- **CoinGecko**: For fetching live market price trends (BTC/USD). (https://api.coingecko.com)


:clipboard: Tasks To Complete

Your task is to identify and resolve the following **6 core issues**. These range from simple logic errors to deep architectural "legacy" bombs.

### Issue 1 – The "Math Doesn't Match" Problem
The total revenue numbers at the top don't update correctly when you filter the list below. Also, the app feels "laggy" when switching categories.
*   **Objective**: Fix the data calculation logic and ensure the app doesn't do extra work during filtering.

### Issue 2 – The "Stubborn Refresh" & Changing Prices
The "Refresh" button doesn't always update the charts, and users noticed that prices sometimes change by a few cents purely by sorting the table.
*   **Objective**: Fix the broken refresh button and find where the data is being "corrupted" during sorting.

### Issue 3 – The "Confused Search" Filter
Searching for a product while a category is selected sometimes ignores the category entirely or uses a previous one. 
*   **Objective**: Ensure the search function always knows exactly which category is currently selected and correctly filters the list by name.

### Issue 4 – The "Heavy Clicks and bad code optimization" Problem
The further you scroll in the Entity Explorer, the slower it gets and clicking to select an item in the Character list has a noticeable delay. It feels like the whole screen "freezes" for a split second on every click.
*   **Objective**: Optimize how the app handles selections so that clicking one item doesn't force the entire list to restart its rendering process and also fix the slowing down of page after scrolling down.

### Issue 5 – The "Inconsistant Table Data" Problem
The table data is not consistent with the data displayed in the dashboard after changes pages back and forth.
*   **Objective**: Fix the table data to be consistent with the data displayed in the Dashboard.

### Issue 6 – The "Foundation" Failure (Architectural)
Intermittently, navigating between pages or refreshing causes the entire dashboard sidebar and content to disappear, replaced by a "Legacy System Fault" error screen.
*   **Symptom**: A critical crash that triggers randomly across different parts of the application.

---

:package: Submission Instructions

1. Fork this repository.
2. Create a new branch: `feature/your-name`
3. Make clean and meaningful commits.
4. Push your fork.
5. Create a Pull Request.
6. In PR description include:
   - What issues you identified
   - What changes you made
   - Any assumptions
   - What improvements you would make with more time

:bar_chart: Evaluation Criteria

You will be evaluated on:
- Debugging ability
- State management clarity
- API integration correctness
- Code structure & readability
- Edge case handling
- Commit quality
- Explanation in PR

:dart: What We Are Looking For

This assessment evaluates:
- Your ability to work with an existing codebase
- Your problem-solving approach
- Your understanding of React state & API flow
- Your ability to implement features cleanly
- Your engineering maturity

Technical expectations:
- **Profiling**: Using React DevTools Profiler to hunt re-renders.
- **Memory Analysis**: Finding detached nodes and leaked listeners in Chrome DevTools.
- **Architectural Depth**: Implementing `AbortController` or similar for async safety.
- **Internal Knowledge**: Understanding React's reconciliation, referential identity, and Context propagation.

Good luck!
