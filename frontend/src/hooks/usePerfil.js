import { useSearchParams } from "react-router-dom";
import { PERFIS } from "../utils/perfis";

// Lê o perfil da URL (?perfil=franqueador). Se for inválido, usa "investidor".
export default function usePerfil() {
  const [params] = useSearchParams();
  const pedido = params.get("perfil");
  const id = PERFIS[pedido] ? pedido : "investidor";
  return { id, ...PERFIS[id] };
}
