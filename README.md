# iSESA — Industries Supply Electric S.A. de C.V.

> **Transmitiendo Energía a tus Proyectos**

Sitio web corporativo estático de iSESA, construido con **React + Vite** y desplegable en **AWS S3 + CloudFront**.

---

## Requisitos previos

- **Node.js** ≥ 20 (recomendado: LTS)
- **npm** ≥ 9

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd isesa

# Instalar dependencias
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador. Los cambios se reflejan al instante gracias al HMR de Vite.

## Build de producción

```bash
npm run build
```

Los archivos estáticos se generan en la carpeta `dist/`. Para previsualizarlos localmente:

```bash
npm run preview
```

## Estructura del proyecto

```
isesa/
├── .github/workflows/
│   └── deploy.yml          # CI/CD — build + deploy a S3
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── logo.jpg         # Logo principal de iSESA
│   │   └── logo1.jpg        # Variante del logo
│   ├── components/
│   │   ├── SplashScreen.jsx  # Pantalla de carga animada
│   │   ├── Header.jsx        # Navegación fija
│   │   ├── Hero.jsx          # Sección principal con CTA
│   │   ├── QuienesSomos.jsx  # Misión, visión, historia
│   │   ├── Servicios.jsx     # Grid de servicios
│   │   ├── Clientes.jsx      # Logos y cobertura
│   │   ├── Proyectos.jsx     # Proyectos destacados
│   │   ├── Proceso.jsx       # Timeline de proceso
│   │   ├── Contacto.jsx      # Formulario de contacto
│   │   └── Footer.jsx        # Pie de página
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css            # Estilos globales y variables
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Flujo de ramas (Git Flow)

| Rama | Propósito |
|------|-----------|
| `master` | Código en producción. Los push a esta rama disparan el deploy. |
| `develop` | Rama de integración. Se mergen las features aquí. |
| `feature/*` | Nuevas funcionalidades (ej. `feature/carrusel-clientes`). |
| `release/*` | Preparación de release (últimos ajustes, bump de versión). |
| `hotfix/*` | Correcciones urgentes sobre master. |

### Flujo de trabajo típico

```bash
# Crear feature desde develop
git checkout develop
git checkout -b feature/nueva-seccion

# Trabajar, commitear...
git add . && git commit -m "feat: agregar nueva sección"

# Merge a develop
git checkout develop
git merge feature/nueva-seccion

# Cuando esté listo para producción
git checkout -b release/1.0.0
# ajustes finales...
git checkout master
git merge release/1.0.0
git tag v1.0.0
git push origin master --tags
```

## Despliegue en AWS

### Secretos requeridos en GitHub

| Secreto | Descripción |
|---------|-------------|
| `AWS_ACCESS_KEY_ID` | Access Key del usuario IAM |
| `AWS_SECRET_ACCESS_KEY` | Secret Key del usuario IAM |
| `AWS_REGION` | Región AWS (ej. `us-east-1`) |
| `S3_BUCKET` | Nombre del bucket S3 |
| `CLOUDFRONT_DIST_ID` | ID de la distribución CloudFront (opcional) |

### Configuración manual de S3

1. Crear un bucket S3 con **Static Website Hosting** habilitado.
2. Configurar la política del bucket para acceso público (o usar CloudFront como origin).
3. Opcionalmente, crear una distribución CloudFront apuntando al bucket.
4. Descomentar los pasos de deploy en `.github/workflows/deploy.yml`.

## Paleta de colores

| Color | Hex | Uso |
|-------|-----|-----|
| Azul oscuro | `#0A2540` | Color primario, fondos, textos principales |
| Azul medio | `#1B6EC2` | Botones, acentos activos |
| Azul claro | `#4DA3FF` | Highlights, badges, hover |
| Gris oscuro | `#1E293B` | Texto de cuerpo |
| Gris claro | `#F1F5F9` | Fondos alternos |

## Licencia

Todos los derechos reservados © Industries Supply Electric S.A. de C.V.
