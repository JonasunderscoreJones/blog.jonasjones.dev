<script context="module" lang="ts">
    export async function load({ error, status }) {
      return {
        status,
        error: error.message || 'An error occurred'
      };
    }
  </script>

  <script lang="ts">
    export let status: number;
    export let error: string;
  </script>

  <style>
    .error-page {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      flex-direction: column;
      text-align: center;
    }
    .error-page h1 {
      font-size: 5rem;
      margin: 0;
    }
    .error-page p {
      font-size: 1.5rem;
    }
  </style>

  <div class="error-page">
    <h1>{status}</h1>
    <p>{error}</p>
    {#if status === 404}
      <p>Sorry, the page you are looking for does not exist.</p>
    {/if}
  </div>
