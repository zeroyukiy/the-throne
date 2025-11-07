<script>
import { ref } from 'vue';

export const auth = ref({
  user: ""
})

export async function is_authenticated() {
  const req = await fetch("/api/me", {
    method: "GET",
    credentials: "include",
  });
  if (req.ok) {
    const { name } = await req.json();
    return name;
  }
}
</script>

<!-- export const auth = {
  user: "",
}; -->

<!-- export async function is_authenticated() {
  const req = await fetch("/api/me", {
    method: "GET",
    credentials: "include",
  });
  if (req.ok) {
    const { name } = await req.json();
    return name;
  }
} -->
