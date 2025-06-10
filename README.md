<!-- ci-cd-diagram -->

```mermaid
graph TD;
    A[Commit] --> B[Build];
    B --> C[Test];
    C --> D[Deploy];
