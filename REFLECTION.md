# Week 4 Reflection — CampusEats

This milestone helped me understand how a React application can load vendor and menu information from a JSON file instead of writing all the data directly into the components. I learned how the `useVendors` hook helps manage the data-loading process and how props allow components to display the relevant vendor and menu information.

One challenge was understanding how the different files work together. I learned that the data source, custom hook, parent component, and reusable child components each have different responsibilities. I also used the production build to check whether the project could compile successfully.

AI assistance helped me troubleshoot errors and understand the implementation steps. I still need to practise writing React code independently and explaining the purpose of each component and function.

## Reflection Questions

### 1. What is the difference between imperative and declarative UI?

Imperative UI describes the specific steps needed to change the interface. Declarative UI describes what the interface should look like based on the current data and state. React mainly uses a declarative approach.

### 2. Why must React component names start with a capital letter?

Capitalisation allows React to distinguish custom components, such as `VendorCard`, from built-in HTML elements, such as `div` and `button`.

### 3. What is a React fragment (`<>...</>`), and why use it instead of a `div`?

A fragment lets a component return multiple elements without adding an extra DOM element. It is useful when a wrapper `div` is unnecessary.

### 4. What is the benefit of breaking an interface into small components?

Small components make code easier to read, reuse, test, maintain, and update. Each component can focus on a specific part of the interface.

## Next Steps

My next goal is to improve the application with vendor selection and a working cart counter using React state and event handlers.