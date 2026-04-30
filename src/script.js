/* Tailwind Configuration and Logic */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              "surface-container-low": "#1b1b25",
              "secondary-fixed": "#74ff6a",
              "surface-container-lowest": "#0d0d17",
              "secondary-container": "#00c723",
              "on-secondary-fixed": "#002201",
              "surface-dim": "#12121d",
              "on-tertiary-fixed": "#320047",
              "on-surface": "#e4e1f0",
              "outline-variant": "#434655",
              "on-surface-variant": "#c3c5d7",
              "on-tertiary-container": "#f5ceff",
              "tertiary-container": "#9b00d2",
              "surface-bright": "#393844",
              "on-secondary-fixed-variant": "#005308",
              "primary-fixed": "#dbe1ff",
              "inverse-on-surface": "#302f3b",
              "surface-container-high": "#292934",
              "on-tertiary": "#520071",
              "inverse-surface": "#e4e1f0",
              "surface": "#12121d",
              "tertiary-fixed": "#f8d8ff",
              "secondary": "#3de440",
              "on-tertiary-fixed-variant": "#74009f",
              "tertiary": "#ecb2ff",
              "surface-variant": "#34343f",
              "inverse-primary": "#0052de",
              "on-secondary": "#003a04",
              "primary": "#b4c5ff",
              "on-primary": "#002979",
              "error-container": "#93000a",
              "background": "#12121d",
              "primary-fixed-dim": "#b4c5ff",
              "secondary-fixed-dim": "#3de440",
              "on-error": "#690005",
              "primary-container": "#0053e1",
              "on-primary-container": "#d1d9ff",
              "surface-container": "#1f1f29",
              "surface-tint": "#b4c5ff",
              "outline": "#8d90a1",
              "on-secondary-container": "#004b06",
              "on-error-container": "#ffdad6",
              "surface-container-highest": "#34343f",
              "on-primary-fixed": "#00174c",
              "on-background": "#e4e1f0",
              "error": "#ffb4ab",
              "tertiary-fixed-dim": "#ecb2ff",
              "on-primary-fixed-variant": "#003daa"
      },
      "borderRadius": {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
      },
      "spacing": {
              "container-padding": "16px",
              "window-margin": "24px",
              "unit": "4px",
              "gutter": "12px",
              "taskbar-height": "40px"
      },
      "fontFamily": {
              "window-title": [
                       "Tahoma, sans-serif"
               ],
               "terminal-md": [
                       "VT323"
               ],
               "display-header": [
                       "Orbitron"
               ],
               "label-caps": [
                       "Space Grotesk"
               ]
      },
      "fontSize": {
              "window-title": [
                       "13px",
                       {
                               "lineHeight": "16px",
                               "fontWeight": "700"
                       }
               ],
               "terminal-md": [
                       "20px",
                       {
                               "lineHeight": "24px",
                               "fontWeight": "400"
                       }
               ],
               "display-header": [
                       "42px",
                       {
                               "lineHeight": "1.2",
                               "letterSpacing": "0.1em",
                               "fontWeight": "700"
                       }
               ],
               "label-caps": [
                       "12px",
                       {
                               "lineHeight": "14px",
                               "fontWeight": "600"
                       }
               ]
      }
    },
  },
}
