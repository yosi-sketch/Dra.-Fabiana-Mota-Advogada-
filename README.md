# Dra. Fabiana Mota — Advocacia Previdenciária

Site institucional em pt-BR para Araxá, MG. Frentes de atendimento: aposentadorias, BPC/LOAS, benefícios por incapacidade e pensão por morte.

## Executar

- Desenvolvimento: npm run dev
- Produção: npm run build e npm run start
- Verificação: npm run lint -- app

Next.js 16.3.5, React 19.2.8, Tailwind CSS 4. Leia AGENTS.md e os guias locais em node_modules/next/dist/docs antes de alterar APIs.

## Marca e conteúdo

Dados e links em app/lib/brand.ts. Tokens Tailwind em app/globals.css por @theme inline, conforme Tailwind 4; não é necessário um tailwind.config separado. Marcellus e Manrope via next/font em app/layout.tsx. Marcellus acompanha as serifas romanas do logo; Manrope atende textos e controles.

Prata #d0cbc4, grafite #2b3236 e branco #f9f8f7 amostrados do logo. Azul-petróleo #043b54 extraído do fundo da peça institucional enviada pelo cliente. Tons derivados para leitura e contraste. Logo sobre fundo escuro, preservando seus pixels, proporções e transparência. Documentação visual em DESIGN.md; método de amostragem em .impeccable/palette-source.json.

Assets: public/fabiana-mota-logo.png (2172 × 724), public/fabiana-mota-institucional.png (680 × 192) e public/fabiana-mota-retrato.jpg (1170 × 2080). Arquivos fornecidos pelo cliente; foto extraída de Instagram (1).zip. Sem cortes, recoloração ou retoques. Proveniência incorporada aos metadados; origens e SHA-256 em .impeccable/asset-origins.json.

WhatsApp: 5534991502835. Telefone: (34) 99150-2835. Instagram: @fabianamotaadvogada. Endereço: Av. Antônio Carlos, 265 — Sala 3 — Centro, Araxá — MG, 38183-083.

Google: CID 7239841301722783520, conforme o material do cliente; 33 avaliações informadas em 19/10/2026, sem integração ao vivo. Nota agregada 5,0 e seis trechos literais com autoria em app/lib/reviews.ts. Não são atribuídas notas individuais.

## Dados pendentes

E-mail, número de OAB, domínio, horários completos e atendimento online não foram fornecidos. Configure NEXT_PUBLIC_SITE_URL quando houver um domínio real, para habilitar imagens de compartilhamento com URL absoluta.
