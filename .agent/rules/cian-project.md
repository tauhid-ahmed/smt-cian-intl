---
trigger: model_decision
description: use the rules when asked to integrate api 
---

### **API Integration Task Instructions**

I will provide complete API details, including:

* Full API URL
* HTTP method
* Required params (query, path)
* Request body (form data / JSON)

#### **Your responsibilities:**

1. **API Route Setup**

   * Add the API endpoint to `lib/config/api.ts`
   * Follow the existing API naming and structure conventions

2. **RTK Query Integration**

   * Create the API call inside the `/lib/api` folder using RTK Query
   * Export the generated hook

3. **Page Integration**

   * Use the exported hook in the requested page/component
   * Collect required data from the UI and trigger the API call

4. **UI State Handling**

   * Show loading states appropriately (e.g., loading on buttons during mutation)
   * Display skeleton loaders when fetching data
   * Handle and display success and error messages where necessary

#### **Constraints**

* Reuse the existing API integration structure
* Do not introduce new patterns unless required
* Keep the implementation clean, readable, and maintainable