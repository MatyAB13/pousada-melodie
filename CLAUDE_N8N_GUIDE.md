# Guía para Conectar Claude AI con n8n

## Paso 1: Obtener API Key de Anthropic

1. Ve a https://console.anthropic.com/
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys" en el menú
4. Crea una nueva API key
5. **Copia y guarda tu API key** (solo se muestra una vez)

## Paso 2: Configurar n8n con tu API Key

### Opción A: Usar el nodo HTTP (Método universal)

1. Abre n8n en tu navegador (usualmente http://localhost:5678)
2. Crea un nuevo workflow
3. Busca y añade el nodo "HTTP Request"
4. Configura:
   - **Method**: POST
   - **URL**: https://api.anthropic.com/v1/messages
   - **Headers**:
     - `x-api-key`: TU_API_KEY_AQUI
     - `anthropic-version`: 2023-06-01
     - `content-type`: application/json
   - **Body**:
     ```json
     {
       "model": "claude-3-haiku-20240307",
       "max_tokens": 1024,
       "messages": [
         {
           "role": "user",
           "content": "Hola, ¿cómo estás?"
         }
       ]
     }
     ```

### Opción B: Usar credenciales en n8n (Más seguro)

1. En n8n, ve a **Settings** → **Credentials**
2. Clic en **Add Credential**
3. Busca **"Anthropic"** (si está disponible) o usa **"Header Auth"**
4. Configura:
   - **Name**: Anthropic API
   - **Header Name**: x-api-key
   - **Header Value**: TU_API_KEY_AQUI

## Paso 3: Ejemplo de Workflow Básico

```
[Webhook] → [HTTP Request (Claude)] → [Respond to Webhook]
```

### Configuración del nodo HTTP:
- **Authentication**: Predefined Credential Type → Header Auth
- **Credential**: Selecciona tu credencial de Anthropic
- **Method**: POST
- **URL**: https://api.anthropic.com/v1/messages
- **Body Content Type**: JSON
- **Body**:
```json
{
  "model": "claude-3-haiku-20240307",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": "{{ $json.message }}"
    }
  ]
}
```

## MODELOS DISPONIBLES

| Modelo | Descripción | Precio |
|--------|-------------|--------|
| claude-3-opus-20240229 | Más capaz | $15/1M tokens |
| claude-3-sonnet-20240229 | Balance | $3/1M tokens |
| claude-3-haiku-20240307 | Más rápido | $0.25/1M tokens |

## Notas Importantes

1. **Costo**: Solo pagas por los tokens que usas
2. **Límites**: Verifica tu límite de uso en el dashboard de Anthropic
3. **Seguridad**: Nunca compartas tu API key públicamente
4. **Prueba**: Usa el modelo Haiku para pruebas (más económico)

## Solución de Problemas

- **Error 401**: Verifica que tu API key sea correcta
- **Error 429**: Has excedido el límite de requests
- **Error 400**: Revisa el formato del body JSON

---

**¿Necesitas más ayuda?** Puedo explicarte cómo crear workflows más específicos para tu caso de uso.

