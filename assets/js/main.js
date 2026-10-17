/**
 * BIZE GROWTH — REVENUE ENGINEERING & AUTONOMOUS CLIENT ACQUISITION
 * Shared Interactive Architecture, Telemetry HUD, Simulator, ROI Engine & Audit Funnel
 * Division of Bize Studios (ABN 51 767 627 987) | https://bizegrowth.com
 */

(function () {
  'use strict';

  const STORAGE_KEY_ROI = 'bize_growth_roi_state_v1';
  const STORAGE_KEY_LEADS = 'bize_growth_audit_submissions_v1';

  // Format currency in Australian Dollars ($ AUD)
  function formatAUD(amount) {
    const num = Number(amount) || 0;
    return '$' + Math.round(num).toLocaleString('en-AU');
  }

  // Toast Notification Utility
  window.showBizeToast = function (message, subtitle = '') {
    let container = document.getElementById('bize-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'bize-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'bize-toast';
    toast.innerHTML = `
      <div class="mt-0.5 text-emerald-400 shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div>
        <div class="font-semibold text-white text-sm">${message}</div>
        ${subtitle ? `<div class="text-xs text-slate-400 mt-0.5 font-mono-code">${subtitle}</div>` : ''}
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 4200);
  };

  // Save ROI / Vertical State to localStorage and navigate to audit.html
  window.lockInPipelineAndBook = function (customState) {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_ROI) || '{}');
      const merged = Object.assign({}, existing, customState, {
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY_ROI, JSON.stringify(merged));
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
    window.location.href = 'audit.html?from=calculator';
  };

  // =========================================================================
  // 1. GLOBAL NAVIGATION & MOBILE DRAWER
  // =========================================================================
  function initNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Highlight current page in navbar
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach((link) => {
      const target = link.getAttribute('data-page');
      if (target === path || (path === '' && target === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // 2. HOME PAGE: LIVE INFRASTRUCTURE TELEMETRY HUD & VERTICAL TABS
  // =========================================================================
  const SENDER_NODES = {
    'brandon-bizegrowth': {
      mailbox: 'brandon@bizegrowth.com',
      domain: 'bizegrowth.com',
      role: 'Primary Outbound Shield Node #01',
      provider: 'Google Workspace OAuth 2.0 + Porkbun DNS',
      cname: 'emailtracking.bizegrowth.com → open.sleadtrack.com (TTL 600)',
      redirect: '301 Wildcard → https://bizestudios.com.au',
      mailTester: '10 / 10 Verified',
      spfDkimDmarc: 'PASS / PASS / PASS (p=quarantine)',
      warmupDaily: '30 / day (+3/day ramp)',
      replyTarget: '35% Automated Peer Reply Ratio',
      schedule: '7 Days / Week Continuous Incubation',
      statusBadge: 'ACTIVE SHIELD — WARMUP 100% HEALTHY'
    },
    'duffy-bizegrowth': {
      mailbox: 'duffy@bizegrowth.com',
      domain: 'bizegrowth.com',
      role: 'Executive Outbound Shield Node #02',
      provider: 'Google Workspace OAuth 2.0 + Porkbun DNS',
      cname: 'emailtracking.bizegrowth.com → open.sleadtrack.com (TTL 600)',
      redirect: '301 Wildcard → https://bizestudios.com.au',
      mailTester: '10 / 10 Verified',
      spfDkimDmarc: 'PASS / PASS / PASS (p=quarantine)',
      warmupDaily: '30 / day (+3/day ramp)',
      replyTarget: '35% Automated Peer Reply Ratio',
      schedule: '7 Days / Week Continuous Incubation',
      statusBadge: 'ACTIVE SHIELD — WARMUP 100% HEALTHY'
    },
    'brandon-getbizestudios': {
      mailbox: 'brandon@getbizestudios.com',
      domain: 'getbizestudios.com',
      role: 'Secondary Outbound Shield Node #03',
      provider: 'Google Workspace OAuth 2.0 + Porkbun DNS',
      cname: 'emailtracking.getbizestudios.com → open.sleadtrack.com (TTL 600)',
      redirect: '301 Wildcard → https://bizestudios.com.au',
      mailTester: '10 / 10 Verified',
      spfDkimDmarc: 'PASS / PASS / PASS (p=quarantine)',
      warmupDaily: '30 / day (+3/day ramp)',
      replyTarget: '34% Automated Peer Reply Ratio',
      schedule: '7 Days / Week Continuous Incubation',
      statusBadge: 'ACTIVE SHIELD — WARMUP 100% HEALTHY'
    },
    'duffy-getbizestudios': {
      mailbox: 'duffy@getbizestudios.com',
      domain: 'getbizestudios.com',
      role: 'Secondary Outbound Shield Node #04',
      provider: 'Google Workspace OAuth 2.0 + Porkbun DNS',
      cname: 'emailtracking.getbizestudios.com → open.sleadtrack.com (TTL 600)',
      redirect: '301 Wildcard → https://bizestudios.com.au',
      mailTester: '10 / 10 Verified',
      spfDkimDmarc: 'PASS / PASS / PASS (p=quarantine)',
      warmupDaily: '30 / day (+3/day ramp)',
      replyTarget: '35% Automated Peer Reply Ratio',
      schedule: '7 Days / Week Continuous Incubation',
      statusBadge: 'ACTIVE SHIELD — WARMUP 100% HEALTHY'
    },
    'primary-vault': {
      mailbox: 'brandon@bizestudios.com.au',
      domain: 'bizestudios.com.au (Primary Brand Vault)',
      role: 'Air-Gapped Corporate & Warm Client Operations',
      provider: 'Isolated Corporate Mail Server (Zero Outbound Automation)',
      cname: 'NONE — Zero Cold Tracking Attached',
      redirect: 'Primary Canonical Destination Domain',
      mailTester: '10 / 10 Verified (Zero Blocklists)',
      spfDkimDmarc: 'STRICT ENFORCEMENT (100% Protected)',
      warmupDaily: '0 Cold Emails (Strictly Warm 1-to-1)',
      replyTarget: 'Direct Client & Production Enquiries Only',
      schedule: 'Permanent Domain Reputation Isolation',
      statusBadge: 'AIR-GAPPED VAULT — 100% PROTECTED'
    }
  };

  function initHomeTelemetryHUD() {
    const nodeButtons = document.querySelectorAll('[data-node-select]');
    if (!nodeButtons.length) return;

    function renderNode(nodeKey) {
      const data = SENDER_NODES[nodeKey];
      if (!data) return;

      nodeButtons.forEach((btn) => {
        if (btn.getAttribute('data-node-select') === nodeKey) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      const map = {
        'hud-mailbox': data.mailbox,
        'hud-role': data.role,
        'hud-provider': data.provider,
        'hud-cname': data.cname,
        'hud-redirect': data.redirect,
        'hud-mailtester': data.mailTester,
        'hud-auth': data.spfDkimDmarc,
        'hud-warmup': data.warmupDaily,
        'hud-reply': data.replyTarget,
        'hud-schedule': data.schedule,
        'hud-status-badge': data.statusBadge
      };

      Object.keys(map).forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = map[id];
      });
    }

    nodeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        renderNode(btn.getAttribute('data-node-select'));
      });
    });
  }

  // Home Page Target Verticals Preview Tabs
  const HOME_VERTICAL_DATA = {
    subcontractors: {
      title: 'Commercial Subcontractors & Facility Specialists',
      subtitle: 'Commercial HVAC, Fire Compliance, Commercial Solar, Strata Maintenance & Office Fit-Outs',
      dealRange: '$15,000 – $80,000+ AUD',
      targetBuyer: 'Facility Managers, Strata Directors, Tier-2 Builders & Commercial Property Owners',
      triggers: [
        'NSW Planning Portal DA & Complying Development Certificate (CDC) approvals',
        'Strata plan capital works fund allocations & annual fire safety statement (AFSS) renewals',
        'Commercial tenancy lease handovers & multi-floor office defit/fit-out tenders'
      ],
      sampleSubject: ' Parramatta commercial strata portfolio / AFSS & HVAC tender panel',
      sampleBody: `G'day Mark,\n\nSaw your strata group just took over management of the 4-tower commercial complex on George St in Parramatta.\n\nWhen facility managers inherit multi-tenancy buildings mid-quarter, getting reliable mechanical & fire compliance subcontractors onto the panel without blowing out capital works budgets is usually top of mind.\n\nWe handle statutory HVAC & fire maintenance for 14 commercial buildings across Greater Western Sydney with guaranteed 4-hour emergency SLA.\n\nWorth a quick 10-minute chat next Tuesday to see if you need a backup contractor on your tender list?\n\nCheers,\nBrandon`
    },
    msp: {
      title: 'Managed IT & Cybersecurity Providers (MSPs)',
      subtitle: 'Independent 10–50 Seat IT Providers Targeting Legal, Accounting, Financial & Engineering Firms',
      dealRange: '$2,000 – $6,000/mo Recurring ($24k–$72k+ ACV)',
      targetBuyer: 'Managing Partners, Practice Managers, COOs & Directors (15–80 Seat Firms)',
      triggers: [
        'ACSC Essential Eight & Cyber Insurance compliance renewals for legal/accounting practices',
        'Hiring a new Practice Manager or COO (prime 90-day vendor review window)',
        'Multi-office expansion or cloud migration footprints detected via DNS/MX records'
      ],
      sampleSubject: 'Essential Eight audit + IT response times at Clarke & Partners',
      sampleBody: `Hi Sarah,\n\nNoticed Clarke & Partners recently onboarded four additional senior solicitors across your Sydney CBD and Norwest offices.\n\nMost 35-seat legal practices we speak with hit a bottleneck around that headcount where their incumbent IT provider takes 6+ hours to resolve urgent document-management tickets, or struggles with ACSC Essential Eight cyber insurance sign-off.\n\nWe specialise strictly in sub-15-minute SLA managed IT for NSW legal and accounting practices.\n\nOpen to a brief 12-minute benchmark review this Thursday to compare your current per-seat setup?\n\nBest regards,\nBrandon`
    },
    recruitment: {
      title: 'Boutique Executive Search & Specialised Recruitment',
      subtitle: 'Engineering, Civil Infrastructure, Mining, Logistics & Healthcare Recruitment Agencies',
      dealRange: '$8,000 – $25,000+ Placement Fees',
      targetBuyer: 'Heads of People & Culture, Operations Directors, Project Directors & Managing Directors',
      triggers: [
        'Hard-to-fill senior technical roles sitting unplaced on Seek/LinkedIn for 21+ days',
        'Major state infrastructure, civil construction, or defence sub-contract awards',
        'Sudden leadership departures or rapid project mobilisation announcements'
      ],
      sampleSubject: 'Senior Civil Project Manager role (Newcastle / Hunter Valley)',
      sampleBody: `G'day David,\n\nSaw your Seek listing for a Senior Civil Project Manager in the Hunter has been live for just over three weeks following your recent roads package award.\n\nTrying to pull Tier-1 civil engineers off active projects via standard job boards right now is brutal.\n\nWe quietly map and headhunt passive Senior PMs and Estimators across NSW civil contractors—and we currently have two pre-vetted engineers in Newcastle looking for their next project lead role.\n\nWant me to send over their anonymised project briefs so you can see if their RMS/TfNSW experience fits?\n\nCheers,\nBrandon`
    }
  };

  function initHomeVerticalTabs() {
    const tabBtns = document.querySelectorAll('[data-home-vertical]');
    if (!tabBtns.length) return;

    function selectVertical(key) {
      const data = HOME_VERTICAL_DATA[key];
      if (!data) return;

      tabBtns.forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-home-vertical') === key);
      });

      const titleEl = document.getElementById('hv-title');
      const subEl = document.getElementById('hv-subtitle');
      const dealEl = document.getElementById('hv-deal');
      const buyerEl = document.getElementById('hv-buyer');
      const triggersEl = document.getElementById('hv-triggers');
      const subjectEl = document.getElementById('hv-sample-subject');
      const bodyEl = document.getElementById('hv-sample-body');
      const ctaBtn = document.getElementById('hv-audit-cta');

      if (titleEl) titleEl.textContent = data.title;
      if (subEl) subEl.textContent = data.subtitle;
      if (dealEl) dealEl.textContent = data.dealRange;
      if (buyerEl) buyerEl.textContent = data.targetBuyer;
      if (subjectEl) subjectEl.textContent = data.sampleSubject;
      if (bodyEl) bodyEl.textContent = data.sampleBody;

      if (triggersEl) {
        triggersEl.innerHTML = data.triggers
          .map(
            (t) => `
          <li class="flex items-start gap-2.5 text-sm text-slate-300">
            <span class="text-emerald-400 font-mono-code mt-0.5">▸</span>
            <span>${t}</span>
          </li>`
          )
          .join('');
      }

      if (ctaBtn) {
        ctaBtn.onclick = function () {
          window.lockInPipelineAndBook({ vertical: key });
        };
      }
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        selectVertical(btn.getAttribute('data-home-vertical'));
      });
    });
  }

  // Home Page Embedded Mini ROI Calculator
  function initHomeMiniCalculator() {
    const dealSlider = document.getElementById('home-calc-deal');
    const volumeSlider = document.getElementById('home-calc-volume');
    const closeSlider = document.getElementById('home-calc-close');
    if (!dealSlider || !volumeSlider || !closeSlider) return;

    function updateMiniCalc() {
      const dealVal = Number(dealSlider.value);
      const volumeVal = Number(volumeSlider.value);
      const closeRate = Number(closeSlider.value);

      // 1.8% average positive meeting conversion rate on hyper-personalised outbound
      const monthlyMeetings = Math.max(4, Math.round(volumeVal * 0.018));
      const annualMeetings = monthlyMeetings * 12;
      const annualDeals = Math.max(1, Math.round(annualMeetings * (closeRate / 100)));
      const annualRevenue = annualDeals * dealVal;
      const annualPipeline = annualMeetings * dealVal;

      const sdrCost = 128825; // $95k base + 11.5% super + software stack + overhead
      const bizeAnnualCost = 36000; // $3,000/mo average retainer
      const roiMultiple = (annualRevenue / bizeAnnualCost).toFixed(1);

      const elDeal = document.getElementById('home-calc-deal-val');
      const elVol = document.getElementById('home-calc-volume-val');
      const elClose = document.getElementById('home-calc-close-val');
      const elMeetings = document.getElementById('home-out-meetings');
      const elPipeline = document.getElementById('home-out-pipeline');
      const elRevenue = document.getElementById('home-out-revenue');
      const elRoi = document.getElementById('home-out-roi');
      const elSavings = document.getElementById('home-out-savings');

      if (elDeal) elDeal.textContent = formatAUD(dealVal) + ' AUD';
      if (elVol) elVol.textContent = volumeVal.toLocaleString('en-AU') + ' prospects/mo';
      if (elClose) elClose.textContent = closeRate + '%';
      if (elMeetings) elMeetings.textContent = `${monthlyMeetings}/mo (${annualMeetings}/yr)`;
      if (elPipeline) elPipeline.textContent = formatAUD(annualPipeline);
      if (elRevenue) elRevenue.textContent = formatAUD(annualRevenue);
      if (elRoi) elRoi.textContent = roiMultiple + 'x ROI';
      if (elSavings) elSavings.textContent = formatAUD(sdrCost - bizeAnnualCost) + '/yr saved vs In-House SDR';
    }

    [dealSlider, volumeSlider, closeSlider].forEach((input) => {
      input.addEventListener('input', updateMiniCalc);
    });

    const lockBtn = document.getElementById('home-calc-lock-btn');
    if (lockBtn) {
      lockBtn.addEventListener('click', () => {
        const dealVal = Number(dealSlider.value);
        const volumeVal = Number(volumeSlider.value);
        const closeRate = Number(closeSlider.value);
        const monthlyMeetings = Math.max(4, Math.round(volumeVal * 0.018));
        const annualDeals = Math.max(1, Math.round(monthlyMeetings * 12 * (closeRate / 100)));
        const annualRevenue = annualDeals * dealVal;

        window.lockInPipelineAndBook({
          dealValue: dealVal,
          monthlyVolume: volumeVal,
          closeRate: closeRate,
          projectedAnnualRevenue: annualRevenue,
          projectedMonthlyMeetings: monthlyMeetings
        });
      });
    }

    updateMiniCalc();
  }

  // =========================================================================
  // 3. SYSTEM PAGE: BEFORE/AFTER GEMINI-4-ARGON TOGGLE & DNS INSPECTOR
  // =========================================================================
  const SYSTEM_EMAIL_COMPARISONS = {
    subcontractors: {
      beforeSubject: '🔥 Best Commercial HVAC & Facility Maintenance Services in Sydney!!',
      beforeSender: 'sales@company-main-domain.com.au (Primary Domain At Risk!)',
      beforeSpamScore: '6.8 / 10 — LANDS IN PROMOTIONS / SPAM',
      beforeBody: `Dear Sir/Madam,\n\nI hope this email finds you well! We are a leading commercial HVAC and fire maintenance company servicing Sydney and NSW with over 15 years of experience.\n\nWe pride ourselves on quality workmanship, competitive pricing, and 24/7 service. Please click our brochure link below or book a 30-minute discovery call on my Calendly link to learn how we can synergise with your facility management needs!\n\n[HTML Tracking Pixel Attached] [3 External Links] [2MB PDF Attachment]`,
      afterSubject: 'Parramatta strata portfolio / mechanical & AFSS tender panel',
      afterSender: 'brandon@bizegrowth.com (Isolated Shield Node #01 — 10/10 Mail-Tester)',
      afterSpamScore: '0.0 / 10 — PRIMARY INBOX PLACEMENT',
      afterBody: `G'day Mark,\n\nSaw your strata group just took over management of the 4-tower commercial complex on George St in Parramatta.\n\nWhen facility managers inherit multi-tenancy buildings mid-quarter, getting reliable mechanical & fire compliance subcontractors onto the panel without blowing out capital works budgets is usually top of mind.\n\nWe handle statutory HVAC & fire maintenance for 14 commercial buildings across Greater Western Sydney with guaranteed 4-hour emergency SLA.\n\nWorth a quick 10-minute chat next Tuesday to see if you need a backup contractor on your tender list?\n\nCheers,\nBrandon`
    },
    msp: {
      beforeSubject: 'Is your business protected from cyber threats? Free IT Audit Inside!',
      beforeSender: 'marketing@msp-primary-domain.com.au (Primary Domain At Risk!)',
      beforeSpamScore: '7.4 / 10 — BLOCKED BY MIME-CAST / DEFENDER',
      beforeBody: `Hi {{First_Name}},\n\nCybercrime is up 400% in Australia this year! Is your law firm doing enough to stay safe?\n\nAt XYZ IT Solutions, we offer comprehensive Managed IT, Cloud Migration, VoIP, and Cybersecurity packages tailored to your needs. Click here to download our 12-page whitepaper on the Essential Eight and book a free audit today!\n\nWarmest regards,\nThe Sales Team`,
      afterSubject: 'Essential Eight audit + IT response times at Clarke & Partners',
      afterSender: 'duffy@getbizestudios.com (Isolated Shield Node #04 — 10/10 Mail-Tester)',
      afterSpamScore: '0.0 / 10 — PRIMARY INBOX PLACEMENT',
      afterBody: `Hi Sarah,\n\nNoticed Clarke & Partners recently onboarded four additional senior solicitors across your Sydney CBD and Norwest offices.\n\nMost 35-seat legal practices we speak with hit a bottleneck around that headcount where their incumbent IT provider takes 6+ hours to resolve urgent document-management tickets, or struggles with ACSC Essential Eight cyber insurance sign-off.\n\nWe specialise strictly in sub-15-minute SLA managed IT for NSW legal and accounting practices.\n\nOpen to a brief 12-minute benchmark review this Thursday to compare your current per-seat setup?\n\nBest regards,\nBrandon`
    },
    recruitment: {
      beforeSubject: 'Top Talent Available Now - Partner With Our Recruitment Agency',
      beforeSender: 'info@agency-domain.com.au (Primary Domain At Risk!)',
      beforeSpamScore: '5.9 / 10 — HIGH UNSUBSCRIBE & COMPLAINT RATE',
      beforeBody: `Hello HR Manager,\n\nAre you struggling to hire great staff in today's competitive market? We are a boutique recruitment agency with access to thousands of candidates across Australia.\n\nWhether you need temporary or permanent staff, our dedicated consultants deliver fast turnarounds at low rates. Let's schedule a call this week to discuss your hiring roadmap!\n\nBest,\nAccount Executive`,
      afterSubject: 'Senior Civil Project Manager role (Newcastle / Hunter Valley)',
      afterSender: 'brandon@getbizestudios.com (Isolated Shield Node #03 — 10/10 Mail-Tester)',
      afterSpamScore: '0.0 / 10 — PRIMARY INBOX PLACEMENT',
      afterBody: `G'day David,\n\nSaw your Seek listing for a Senior Civil Project Manager in the Hunter has been live for just over three weeks following your recent roads package award.\n\nTrying to pull Tier-1 civil engineers off active projects via standard job boards right now is brutal.\n\nWe quietly map and headhunt passive Senior PMs and Estimators across NSW civil contractors—and we currently have two pre-vetted engineers in Newcastle looking for their next project lead role.\n\nWant me to send over their anonymised project briefs so you can see if their RMS/TfNSW experience fits?\n\nCheers,\nBrandon`
    }
  };

  function initSystemPage() {
    const verticalBtns = document.querySelectorAll('[data-sys-vertical]');
    const modeBtns = document.querySelectorAll('[data-sys-mode]');
    if (!verticalBtns.length) return;

    let currentVertical = 'subcontractors';
    let currentMode = 'after'; // 'before' or 'after'

    function renderComparison() {
      const item = SYSTEM_EMAIL_COMPARISONS[currentVertical];
      if (!item) return;

      verticalBtns.forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-sys-vertical') === currentVertical);
      });
      modeBtns.forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-sys-mode') === currentMode);
      });

      const isAfter = currentMode === 'after';
      const subjectEl = document.getElementById('sys-email-subject');
      const senderEl = document.getElementById('sys-email-sender');
      const scoreEl = document.getElementById('sys-email-score');
      const bodyEl = document.getElementById('sys-email-body');
      const panelEl = document.getElementById('sys-email-panel');

      if (subjectEl) subjectEl.textContent = isAfter ? item.afterSubject : item.beforeSubject;
      if (senderEl) senderEl.textContent = isAfter ? item.afterSender : item.beforeSender;
      if (scoreEl) {
        scoreEl.textContent = isAfter ? item.afterSpamScore : item.beforeSpamScore;
        scoreEl.className = isAfter
          ? 'font-mono-code text-xs px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
          : 'font-mono-code text-xs px-2.5 py-1 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30';
      }
      if (bodyEl) bodyEl.textContent = isAfter ? item.afterBody : item.beforeBody;
      if (panelEl) {
        panelEl.className = isAfter
          ? 'surface-card-emerald p-6 transition-all duration-300'
          : 'surface-card p-6 border-rose-500/40 transition-all duration-300';
      }
    }

    verticalBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        currentVertical = btn.getAttribute('data-sys-vertical');
        renderComparison();
      });
    });

    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        currentMode = btn.getAttribute('data-sys-mode');
        renderComparison();
      });
    });

    renderComparison();
  }

  // =========================================================================
  // 4. VERTICALS PAGE: LIVE OUTREACH & TRIGGER SIMULATOR
  // =========================================================================
  const SIMULATOR_DATA = {
    subcontractors: {
      label: 'Commercial Subcontractors & Facility Specialists',
      defaultCompany: 'Vanguard Strata & Commercial Facilities (Parramatta NSW)',
      defaultContact: 'Mark Henderson',
      triggers: [
        {
          id: 'da_approval',
          name: 'NSW Planning Portal DA / Commercial Fit-Out Approval',
          signalSource: 'NSW Planning Portal + Cordell Tender Feed',
          sequences: [
            {
              day: 'Step 1 (Day 1) — Trigger Verification Opener',
              subject: 'CDC fit-out approval at 140 George St / mechanical & fire package',
              body: `G'day {{contact}},\n\nNoticed {{company}} just had the Complying Development Certificate signed off for the 3-floor commercial office refurbishment in Parramatta.\n\nWhen project directors are locking in sub-trades on tight handover schedules, mechanical HVAC ductwork and statutory fire damper certifications are usually where programme delays creep in.\n\nOur commercial team specialises in fast-turnaround HVAC and fire compliance packages across Greater Western Sydney (fully insured, CM3 certified, zero defects at OC).\n\nWorth sending through our capability statement and recent Parramatta project references before you close out the trade tender list?\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 2 (Day 4) — Case Context Follow-Up',
              subject: 'Re: CDC fit-out approval at 140 George St / mechanical & fire package',
              body: `G'day {{contact}},\n\nQuick follow-up on the note below — we recently completed a similar 2,400sqm commercial floorplate upgrade in Macquarie Park for a Tier-2 builder where we shaved 9 days off the mechanical commissioning schedule.\n\nHappy to price the drawings on a no-obligation basis so you have a sharp benchmark against your incumbent subbies.\n\nIf you're already locked in for this project, happy to connect ahead of your next tender.\n\nBest,\nBrandon`
            },
            {
              day: 'Step 3 (Day 9) — Peer-to-Peer Closeout',
              subject: 'Re: CDC fit-out approval at 140 George St / mechanical & fire package',
              body: `Hi {{contact}},\n\nAssuming the mechanical and fire trade packages for the George St fit-out are all squared away now.\n\nIf a subcontractor ever pulls out late or you need an urgent variation priced on future Sydney commercial jobs, keep my details handy.\n\nAll the best with the site mobilisation.\n\nCheers,\nBrandon`
            }
          ]
        },
        {
          id: 'afss_strata',
          name: 'Strata Portfolio AFSS & HVAC Preventive Maintenance Renewal',
          signalSource: 'NSW Strata Building Register + Portfolio Change Signal',
          sequences: [
            {
              day: 'Step 1 (Day 1) — Trigger Verification Opener',
              subject: 'Annual Fire Safety Statement (AFSS) + HVAC SLAs across {{company}}',
              body: `G'day {{contact}},\n\nSaw {{company}} recently expanded its commercial and mixed-use strata management portfolio across Sydney's North Shore and Parramatta.\n\nMost senior strata managers tell us their biggest headache right now is chasing slow mechanical and fire contractors for AFSS sign-offs while dealing with tenant air-conditioning complaints.\n\nWe run dedicated preventive maintenance programmes with a guaranteed 4-hour emergency callout SLA and digital compliance reporting.\n\nOpen to a quick 10-minute chat next week to see how we benchmark against your current trade panel?\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 2 (Day 4) — Case Context Follow-Up',
              subject: 'Re: Annual Fire Safety Statement (AFSS) + HVAC SLAs across {{company}}',
              body: `Hi {{contact}},\n\nJust circling back briefly — for strata portfolios managing 10+ commercial plans, we consolidate all quarterly mechanical and fire inspections into a single portal so your strata managers never miss a council AFSS deadline.\n\nWorth a brief look this Thursday at 11am?\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 3 (Day 9) — Peer-to-Peer Closeout',
              subject: 'Re: Annual Fire Safety Statement (AFSS) + HVAC SLAs across {{company}}',
              body: `G'day {{contact}},\n\nWon't crowd your inbox — if your current HVAC and fire compliance contractors are hitting every SLA, no need to change a thing.\n\nIf a tricky building comes up for re-tendering this quarter, feel free to flick over the asset schedule anytime.\n\nCheers,\nBrandon`
            }
          ]
        },
        {
          id: 'commercial_solar',
          name: 'High-Consumption Commercial Warehouse / ESG Solar Mandate',
          signalSource: 'Commercial Industrial Roof Footprint + Energy Tariff Trigger',
          sequences: [
            {
              day: 'Step 1 (Day 1) — Trigger Verification Opener',
              subject: '100kW+ commercial solar yield model for {{company}} facility',
              body: `G'day {{contact}},\n\nWe mapped the roof profile on {{company}}'s Western Sydney distribution facility and ran a preliminary daytime load offset model against the latest NSW commercial network tariffs.\n\nFacilities with your roof footprint are currently cutting daytime grid draw by 58%–65% with a sub-3.1-year payback period using Tier-1 commercial inverters.\n\nWould you be opposed to me emailing over the 1-page engineering yield summary for your operations team to sanity-check?\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 2 (Day 4) — Case Context Follow-Up',
              subject: 'Re: 100kW+ commercial solar yield model for {{company}} facility',
              body: `Hi {{contact}},\n\nFollowing up quickly — our engineering team handles the full Endeavour Energy grid-connection approval and STCs upfront so there's zero disruption to warehouse operations.\n\nLet me know if you'd like the 1-page numbers sent through.\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 3 (Day 9) — Peer-to-Peer Closeout',
              subject: 'Re: 100kW+ commercial solar yield model for {{company}} facility',
              body: `G'day {{contact}},\n\nAssuming commercial energy reduction isn't on the Q4 capital agenda right now. I'll leave the file archived here—reach out anytime if power tariffs spike at renewal.\n\nBest,\nBrandon`
            }
          ]
        }
      ]
    },
    msp: {
      label: 'Managed IT & Cybersecurity Providers (MSPs)',
      defaultCompany: 'Harbourview Legal & Advisory (Sydney CBD)',
      defaultContact: 'Sarah Jenkins',
      triggers: [
        {
          id: 'essential_eight',
          name: 'ACSC Essential Eight & Cyber Insurance Compliance Renewal',
          signalSource: 'Law Society / Professional Practice Registry + MX/SPF Telemetry',
          sequences: [
            {
              day: 'Step 1 (Day 1) — Trigger Verification Opener',
              subject: 'Essential Eight maturity level 2 + IT ticket response at {{company}}',
              body: `Hi {{contact}},\n\nNoticed {{company}} has grown to over 35 fee-earners across your Sydney practice this year.\n\nWith professional indemnity and cyber insurers tightening ACSC Essential Eight requirements for NSW legal and accounting firms, many practices are finding their generalist IT support provider can't evidence Maturity Level 2 compliance—or takes half a day to resolve urgent Leap/iManage tickets.\n\nWe act as the dedicated Managed IT & Cybersecurity partner strictly for 20–60 seat professional services firms in NSW.\n\nOpen to a 12-minute peer review next Tuesday to benchmark your current per-seat SLA and Essential Eight posture?\n\nBest regards,\nBrandon`
            },
            {
              day: 'Step 2 (Day 4) — Case Context Follow-Up',
              subject: 'Re: Essential Eight maturity level 2 + IT ticket response at {{company}}',
              body: `Hi {{contact}},\n\nQuick context on why I reached out — last month we transitioned a 42-seat Sydney commercial firm off a sluggish incumbent MSP over a single weekend with zero billable downtime, cutting their average ticket resolution to 11 minutes.\n\nHappy to share our 1-page Essential Eight Readiness Checklist if useful?\n\nBest,\nBrandon`
            },
            {
              day: 'Step 3 (Day 9) — Peer-to-Peer Closeout',
              subject: 'Re: Essential Eight maturity level 2 + IT ticket response at {{company}}',
              body: `Hi {{contact}},\n\nI'll assume your current IT partner is keeping the partners happy and your cyber compliance is locked down.\n\nIf you ever benchmark your managed services contract prior to renewal, feel free to reach out.\n\nBest regards,\nBrandon`
            }
          ]
        },
        {
          id: 'new_coo',
          name: 'New Practice Manager / COO Appointment (90-Day Vendor Review)',
          signalSource: 'Executive Role Transition + Firm Headcount Velocity',
          sequences: [
            {
              day: 'Step 1 (Day 1) — Trigger Verification Opener',
              subject: 'Operations & IT vendor review at {{company}}',
              body: `Hi {{contact}},\n\nCongrats on stepping into the Practice Operations lead role at {{company}}.\n\nWhen new operations leaders audit internal systems in their first 90 days, recurring IT support frustration and licence sprawl across Microsoft 365 are usually easy wins to clean up.\n\nWe help 25–60 seat Sydney firms consolidate their Microsoft licensing, cyber posture, and helpdesk under a predictable fixed-fee SLA.\n\nWorth a brief 10-minute intro call next week as you review your current vendor agreements?\n\nBest regards,\nBrandon`
            },
            {
              day: 'Step 2 (Day 4) — Case Context Follow-Up',
              subject: 'Re: Operations & IT vendor review at {{company}}',
              body: `Hi {{contact}},\n\nEven if you aren't looking to switch IT providers immediately, we frequently run an independent Microsoft 365 licence & security hygiene audit that uncovers $8k–$15k/yr in redundant seat costs.\n\nHappy to run that quietly for {{company}} if helpful.\n\nBest,\nBrandon`
            },
            {
              day: 'Step 3 (Day 9) — Peer-to-Peer Closeout',
              subject: 'Re: Operations & IT vendor review at {{company}}',
              body: `Hi {{contact}},\n\nKnow your first quarter in the seat is busy—I'll leave it here for now. Wishing you a smooth run ahead with the team at {{company}}.\n\nBest regards,\nBrandon`
            }
          ]
        }
      ]
    },
    recruitment: {
      label: 'Boutique Executive Search & Specialised Recruitment',
      defaultCompany: 'Ironbark Civil & Infrastructure (Newcastle NSW)',
      defaultContact: 'David Callaghan',
      triggers: [
        {
          id: 'aged_job_ad',
          name: 'Senior Technical Role Live on Seek / LinkedIn for 21+ Days',
          signalSource: 'Seek / LinkedIn Job Aging Scraper + Infrastructure Contract Feed',
          sequences: [
            {
              day: 'Step 1 (Day 1) — Trigger Verification Opener',
              subject: 'Senior Civil Project Manager vacancy at {{company}}',
              body: `G'day {{contact}},\n\nNoticed {{company}}'s listing for a Senior Civil Project Manager has been live on Seek for 24 days now.\n\nWith the current pipeline of TfNSW and Hunter infrastructure works, the strongest Senior PMs and Senior Estimators aren't actively browsing job boards—they're heads-down delivering live packages.\n\nWe specialise strictly in headhunting passive civil and mining engineering leaders across NSW, and we have two pre-vetted Senior PMs in the Hunter region open to a confidential move.\n\nWant me to flick over their anonymised project summaries so you can see if their ticket & RMS history matches what you need?\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 2 (Day 4) — Case Context Follow-Up',
              subject: 'Re: Senior Civil Project Manager vacancy at {{company}}',
              body: `G'day {{contact}},\n\nQuick note on one of those two engineers — 11 years Tier-2 civil delivery experience across bridges and bulk earthworks ($35M–$60M packages), available on 4 weeks' notice.\n\nHappy to send the 1-page profile with zero obligation if the role is still unplaced.\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 3 (Day 9) — Peer-to-Peer Closeout',
              subject: 'Re: Senior Civil Project Manager vacancy at {{company}}',
              body: `Hi {{contact}},\n\nAssuming you've shortlisted someone internally for the Senior PM seat.\n\nIf a critical engineering or site leadership role stalls later in the quarter, let me know and we can map the passive market for you within 72 hours.\n\nCheers,\nBrandon`
            }
          ]
        },
        {
          id: 'tender_award',
          name: 'Major Project Mobilisation / State Tender Award',
          signalSource: 'NSW eTendering Award Feed + Headcount Expansion Trigger',
          sequences: [
            {
              day: 'Step 1 (Day 1) — Trigger Verification Opener',
              subject: 'Project mobilisation staffing / {{company}} recent package win',
              body: `G'day {{contact}},\n\nSaw the announcement on {{company}}'s recent regional infrastructure contract award—congratulations to the team.\n\nWhen contractors mobilise for a new package of that scale, securing Project Engineers, HSE Managers, and Commercial Contract Administrators before site works ramp up is usually the tightest bottleneck.\n\nWe maintain a live bench of reference-checked NSW engineering and construction specialists ready for rapid mobilisation.\n\nWorth a quick 10-minute chat this week to see which technical seats you're still looking to fill?\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 2 (Day 4) — Case Context Follow-Up',
              subject: 'Re: Project mobilisation staffing / {{company}} recent package win',
              body: `G'day {{contact}},\n\nFollowing up briefly—we work purely on a success-only placement basis with a 6-month replacement guarantee across all senior technical hires.\n\nLet me know if you'd like to review our current NSW availability list.\n\nCheers,\nBrandon`
            },
            {
              day: 'Step 3 (Day 9) — Peer-to-Peer Closeout',
              subject: 'Re: Project mobilisation staffing / {{company}} recent package win',
              body: `Hi {{contact}},\n\nLooks like your project delivery team is fully resourced for mobilisation. Wishing you a safe and profitable build—keep my details on file if an urgent technical replacement comes up.\n\nCheers,\nBrandon`
            }
          ]
        }
      ]
    }
  };

  function initVerticalSimulator() {
    const vertSelect = document.getElementById('sim-vertical-select');
    const triggerSelect = document.getElementById('sim-trigger-select');
    const companyInput = document.getElementById('sim-company-input');
    const contactInput = document.getElementById('sim-contact-input');
    const stepBtns = document.querySelectorAll('[data-sim-step]');

    if (!vertSelect || !triggerSelect) return;

    let currentStepIndex = 0;

    function populateTriggers(vertKey, resetInputs = true) {
      const vData = SIMULATOR_DATA[vertKey];
      if (!vData) return;

      triggerSelect.innerHTML = vData.triggers
        .map((t, idx) => `<option value="${idx}">${t.name}</option>`)
        .join('');

      if (resetInputs) {
        if (companyInput) companyInput.value = vData.defaultCompany;
        if (contactInput) contactInput.value = vData.defaultContact;
      }
      currentStepIndex = 0;
      renderSimulatedEmail();
    }

    function renderSimulatedEmail() {
      const vertKey = vertSelect.value;
      const vData = SIMULATOR_DATA[vertKey];
      if (!vData) return;

      const trigIdx = Number(triggerSelect.value) || 0;
      const trig = vData.triggers[trigIdx] || vData.triggers[0];
      const seq = trig.sequences[currentStepIndex] || trig.sequences[0];

      const companyVal = (companyInput && companyInput.value.trim()) || vData.defaultCompany;
      const contactVal = (contactInput && contactInput.value.trim()) || vData.defaultContact;
      const firstName = contactVal.split(' ')[0];

      const compiledSubject = seq.subject
        .replace(/\{\{company\}\}/g, companyVal)
        .replace(/\{\{contact\}\}/g, firstName);
      const compiledBody = seq.body
        .replace(/\{\{company\}\}/g, companyVal)
        .replace(/\{\{contact\}\}/g, firstName);

      stepBtns.forEach((btn) => {
        const sIdx = Number(btn.getAttribute('data-sim-step'));
        btn.classList.toggle('active', sIdx === currentStepIndex);
      });

      const elSignal = document.getElementById('sim-signal-source');
      const elStepTitle = document.getElementById('sim-step-label');
      const elSubject = document.getElementById('sim-out-subject');
      const elBody = document.getElementById('sim-out-body');
      const elWordCount = document.getElementById('sim-word-count');

      if (elSignal) elSignal.textContent = trig.signalSource;
      if (elStepTitle) elStepTitle.textContent = seq.day;
      if (elSubject) elSubject.textContent = compiledSubject;
      if (elBody) elBody.textContent = compiledBody;

      if (elWordCount) {
        const words = compiledBody.trim().split(/\s+/).length;
        elWordCount.textContent = `${words} words | 0 HTML links | 10/10 Deliverability`;
      }
    }

    vertSelect.addEventListener('change', () => populateTriggers(vertSelect.value, true));
    triggerSelect.addEventListener('change', () => {
      currentStepIndex = 0;
      renderSimulatedEmail();
    });
    if (companyInput) companyInput.addEventListener('input', renderSimulatedEmail);
    if (contactInput) contactInput.addEventListener('input', renderSimulatedEmail);

    stepBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        currentStepIndex = Number(btn.getAttribute('data-sim-step'));
        renderSimulatedEmail();
      });
    });

    const copyBtn = document.getElementById('sim-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const subj = document.getElementById('sim-out-subject')?.textContent || '';
        const body = document.getElementById('sim-out-body')?.textContent || '';
        const fullText = `SUBJECT: ${subj}\n\n${body}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(fullText);
        }
        window.showBizeToast('Sequence Copied to Clipboard', 'Plain-text gemini-4-argon sequence ready');
      });
    }

    const deployBtn = document.getElementById('sim-deploy-btn');
    if (deployBtn) {
      deployBtn.addEventListener('click', () => {
        window.lockInPipelineAndBook({
          vertical: vertSelect.value,
          preferredTrigger: triggerSelect.options[triggerSelect.selectedIndex]?.text || ''
        });
      });
    }

    // Also allow clicking any vertical deep-dive CTA to pre-select that vertical in simulator or book audit
    document.querySelectorAll('[data-load-simulator]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const vKey = btn.getAttribute('data-load-simulator');
        vertSelect.value = vKey;
        populateTriggers(vKey, true);
        const simSection = document.getElementById('live-simulator');
        if (simSection) simSection.scrollIntoView({ behavior: 'smooth' });
        window.showBizeToast('Loaded Vertical into Live Simulator', SIMULATOR_DATA[vKey]?.label || '');
      });
    });

    populateTriggers(vertSelect.value, true);
  }

  // =========================================================================
  // 5. CALCULATOR PAGE: FULL PIPELINE ROI & SDR REPLACEMENT MODEL
  // =========================================================================
  const CALC_PRESETS = {
    subcontractors: {
      label: 'Commercial Subcontractors & HVAC/Fire',
      dealValue: 38000,
      closeRate: 25,
      monthlyVolume: 1500,
      meetingRate: 1.8,
      retainerCost: 3000
    },
    msp: {
      label: 'Managed IT & Cybersecurity (MSP)',
      dealValue: 48000,
      closeRate: 22,
      monthlyVolume: 1400,
      meetingRate: 1.6,
      retainerCost: 3250
    },
    recruitment: {
      label: 'Executive Search & Recruitment',
      dealValue: 18000,
      closeRate: 30,
      monthlyVolume: 1800,
      meetingRate: 2.0,
      retainerCost: 2500
    },
    enterprise: {
      label: 'High-Ticket Industrial / B2B Enterprise',
      dealValue: 75000,
      closeRate: 20,
      monthlyVolume: 2000,
      meetingRate: 1.5,
      retainerCost: 4000
    }
  };

  function initFullCalculator() {
    const dealInput = document.getElementById('calc-deal-value');
    const closeInput = document.getElementById('calc-close-rate');
    const volumeInput = document.getElementById('calc-monthly-volume');
    const meetingRateInput = document.getElementById('calc-meeting-rate');
    const retainerSelect = document.getElementById('calc-retainer-tier');
    const presetBtns = document.querySelectorAll('[data-calc-preset]');

    if (!dealInput || !closeInput || !volumeInput || !meetingRateInput || !retainerSelect) return;

    let currentVertical = 'subcontractors';

    function computeModel() {
      const dealVal = Number(dealInput.value);
      const closeRate = Number(closeInput.value);
      const volumeVal = Number(volumeInput.value);
      const meetingRate = Number(meetingRateInput.value);
      const monthlyRetainer = Number(retainerSelect.value);

      const monthlyMeetings = Math.max(3, Math.round(volumeVal * (meetingRate / 100)));
      const annualMeetings = monthlyMeetings * 12;
      const annualClosedDeals = Math.max(1, Math.round(annualMeetings * (closeRate / 100)));
      const monthlyPipeline = monthlyMeetings * dealVal;
      const annualPipeline = annualMeetings * dealVal;
      const annualRevenue = annualClosedDeals * dealVal;

      const annualBizeCost = monthlyRetainer * 12;
      // In-house SDR breakdown in Australia ($ AUD)
      const sdrBase = 95000;
      const sdrSuper = 10925; // 11.5% statutory super
      const sdrTechStack = 14400; // Apollo/ZoomInfo + LinkedIn Sales Nav + CRM + Warmup
      const sdrOnboarding = 8500; // Recruitment fee + 3-month dead ramp overhead
      const annualSdrTotal = sdrBase + sdrSuper + sdrTechStack + sdrOnboarding; // $128,825

      const annualPayrollSaved = annualSdrTotal - annualBizeCost;
      const netProfitAdded = annualRevenue - annualBizeCost;
      const roiMultiple = (annualRevenue / annualBizeCost).toFixed(1);
      const costPerMeetingBize = Math.round(annualBizeCost / annualMeetings);
      const costPerMeetingSdr = Math.round(annualSdrTotal / Math.max(12, Math.round(annualMeetings * 0.65)));

      // Update UI labels
      const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };

      setTxt('calc-deal-display', formatAUD(dealVal) + ' AUD');
      setTxt('calc-close-display', closeRate + '%');
      setTxt('calc-volume-display', volumeVal.toLocaleString('en-AU') + ' / mo');
      setTxt('calc-meeting-rate-display', meetingRate.toFixed(1) + '%');

      setTxt('res-monthly-meetings', `${monthlyMeetings} / mo`);
      setTxt('res-annual-meetings', `${annualMeetings} qualified meetings / yr`);
      setTxt('res-closed-deals', `${annualClosedDeals} new contracts / yr`);
      setTxt('res-monthly-pipeline', formatAUD(monthlyPipeline));
      setTxt('res-annual-pipeline', formatAUD(annualPipeline) + ' AUD');
      setTxt('res-annual-revenue', formatAUD(annualRevenue));
      setTxt('res-net-profit', formatAUD(netProfitAdded) + ' Net Gain');
      setTxt('res-roi-multiple', `${roiMultiple}x`);
      setTxt('res-bize-annual-cost', formatAUD(annualBizeCost) + '/yr');
      setTxt('res-bize-monthly-cost', `(${formatAUD(monthlyRetainer)}/mo retainer)`);
      setTxt('res-sdr-annual-cost', formatAUD(annualSdrTotal) + '/yr');
      setTxt('res-payroll-savings', formatAUD(annualPayrollSaved) + ' AUD');
      setTxt('res-cpm-bize', formatAUD(costPerMeetingBize));
      setTxt('res-cpm-sdr', formatAUD(costPerMeetingSdr));

      return {
        vertical: currentVertical,
        dealValue: dealVal,
        closeRate: closeRate,
        monthlyVolume: volumeVal,
        meetingRate: meetingRate,
        monthlyRetainer: monthlyRetainer,
        projectedMonthlyMeetings: monthlyMeetings,
        projectedAnnualMeetings: annualMeetings,
        projectedAnnualDeals: annualClosedDeals,
        projectedAnnualPipeline: annualPipeline,
        projectedAnnualRevenue: annualRevenue,
        annualBizeCost: annualBizeCost,
        annualSdrTotal: annualSdrTotal,
        annualPayrollSaved: annualPayrollSaved,
        roiMultiple: roiMultiple
      };
    }

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const pKey = btn.getAttribute('data-calc-preset');
        const preset = CALC_PRESETS[pKey];
        if (!preset) return;

        currentVertical = pKey === 'enterprise' ? 'subcontractors' : pKey;
        presetBtns.forEach((b) => b.classList.toggle('active', b === btn));

        dealInput.value = preset.dealValue;
        closeInput.value = preset.closeRate;
        volumeInput.value = preset.monthlyVolume;
        meetingRateInput.value = preset.meetingRate;
        retainerSelect.value = preset.retainerCost;

        computeModel();
        window.showBizeToast('Industry Benchmark Loaded', preset.label);
      });
    });

    [dealInput, closeInput, volumeInput, meetingRateInput, retainerSelect].forEach((el) => {
      el.addEventListener('input', computeModel);
      el.addEventListener('change', computeModel);
    });

    // Copy & Download Brief Button
    const downloadBtn = document.getElementById('calc-download-brief-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const m = computeModel();
        const briefText = [
          '===================================================================',
          'BIZE GROWTH — EXECUTIVE PIPELINE ROI & SDR REPLACEMENT BRIEF',
          'Division of Bize Studios (ABN 51 767 627 987) | https://bizegrowth.com',
          '===================================================================',
          `Generated Date: ${new Date().toLocaleDateString('en-AU')}`,
          '',
          '1. INPUT ASSUMPTIONS ($ AUD)',
          `- Average Contract Value (ACV): ${formatAUD(m.dealValue)} AUD`,
          `- Qualified Meeting Close Rate: ${m.closeRate}%`,
          `- Monthly Decision-Makers Reached: ${m.monthlyVolume.toLocaleString('en-AU')} / mo`,
          `- Positive Meeting Conversion Rate: ${m.meetingRate}%`,
          '',
          '2. PROJECTED ANNUAL OUTPUT',
          `- Qualified Sales Appointments: ${m.projectedMonthlyMeetings}/mo (${m.projectedAnnualMeetings}/yr)`,
          `- Projected Annual Pipeline Created: ${formatAUD(m.projectedAnnualPipeline)} AUD`,
          `- Estimated Closed Contracts: ${m.projectedAnnualDeals} deals / yr`,
          `- Projected New Closed Revenue: ${formatAUD(m.projectedAnnualRevenue)} AUD`,
          '',
          '3. FINANCIAL COMPARISON: BIZE GROWTH VS. IN-HOUSE AUSTRALIAN SDR',
          `- In-House SDR Annual Cost (Base $95k + 11.5% Super + Tech Stack): ${formatAUD(m.annualSdrTotal)} AUD/yr`,
          `- Bize Growth Done-For-You Retainer (${formatAUD(m.monthlyRetainer)}/mo): ${formatAUD(m.annualBizeCost)} AUD/yr`,
          `- Direct Annual Overhead Savings: ${formatAUD(m.annualPayrollSaved)} AUD/yr`,
          `- Projected Return on Retainer Spend: ${m.roiMultiple}x ROI`,
          '',
          'Next Step: Book your 15-Minute Pipeline Architecture Audit at https://bizegrowth.com/audit.html',
          'Direct Executive Contact: brandon@bizestudios.com.au'
        ].join('\n');

        if (navigator.clipboard) {
          navigator.clipboard.writeText(briefText);
        }

        // Trigger .txt download
        const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Bize-Growth-ROI-Brief-${m.dealValue}AUD.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        window.showBizeToast('Executive ROI Brief Copied & Downloaded', `${m.roiMultiple}x ROI Model (${formatAUD(m.projectedAnnualRevenue)}/yr)`);
      });
    }

    // Lock In Pipeline & Book Audit CTA
    const lockAuditBtn = document.getElementById('calc-lock-audit-btn');
    if (lockAuditBtn) {
      lockAuditBtn.addEventListener('click', () => {
        const model = computeModel();
        window.lockInPipelineAndBook(model);
      });
    }

    computeModel();
  }

  // =========================================================================
  // 6. AUDIT PAGE: MULTI-STEP QUALIFICATION & READINESS SCORE ENGINE
  // =========================================================================
  function initAuditFunnel() {
    const form = document.getElementById('audit-qualification-form');
    if (!form) return;

    const stepPanels = document.querySelectorAll('[data-audit-step-panel]');
    const stepIndicators = document.querySelectorAll('[data-audit-step-indicator]');
    let currentStep = 1;

    // Form fields
    const fVertical = document.getElementById('audit-vertical');
    const fTerritory = document.getElementById('audit-territory');
    const fRevenue = document.getElementById('audit-revenue');
    const fDealValue = document.getElementById('audit-acv');
    const fBottleneck = document.getElementById('audit-bottleneck');
    const fName = document.getElementById('audit-name');
    const fCompany = document.getElementById('audit-company');
    const fDomain = document.getElementById('audit-domain');
    const fEmail = document.getElementById('audit-email');
    const fPhone = document.getElementById('audit-phone');
    const fNotes = document.getElementById('audit-notes');

    // Hydrate from localStorage if user came from Calculator or Verticals simulator
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_ROI) || '{}');
      if (saved && (saved.dealValue || saved.vertical)) {
        const prefillBanner = document.getElementById('audit-prefill-banner');
        const prefillSummary = document.getElementById('audit-prefill-summary');
        if (prefillBanner) prefillBanner.classList.remove('hidden');

        if (saved.vertical && fVertical) {
          fVertical.value = saved.vertical;
        }
        if (saved.dealValue && fDealValue) {
          const dv = Number(saved.dealValue);
          if (dv >= 50000) fDealValue.value = '50k_plus';
          else if (dv >= 25000) fDealValue.value = '25k_50k';
          else if (dv >= 10000) fDealValue.value = '10k_25k';
        }
        if (prefillSummary) {
          const parts = [];
          if (saved.dealValue) parts.push(`Target ACV: ${formatAUD(saved.dealValue)} AUD`);
          if (saved.projectedMonthlyMeetings) parts.push(`Est. ${saved.projectedMonthlyMeetings} Meetings/mo`);
          if (saved.projectedAnnualRevenue) parts.push(`Projected Revenue: ${formatAUD(saved.projectedAnnualRevenue)}/yr`);
          if (saved.preferredTrigger) parts.push(`Trigger: ${saved.preferredTrigger}`);
          prefillSummary.textContent = parts.join(' • ') || 'Custom Vertical Configuration Loaded';
        }
      }
    } catch (e) {
      console.warn('Prefill parse error:', e);
    }

    function calculateReadinessScore() {
      let score = 68; // Base B2B score

      const vert = fVertical?.value || 'subcontractors';
      if (['subcontractors', 'msp', 'recruitment'].includes(vert)) score += 10;
      else score += 5;

      const acv = fDealValue?.value || '25k_50k';
      if (acv === '50k_plus') score += 12;
      else if (acv === '25k_50k') score += 10;
      else if (acv === '10k_25k') score += 8;
      else score += 2;

      const rev = fRevenue?.value || '80k_250k';
      if (rev === '250k_plus') score += 10;
      else if (rev === '80k_250k') score += 8;
      else if (rev === '35k_80k') score += 6;
      else score += 3;

      score = Math.min(98, Math.max(55, score));

      const scoreDisplay = document.getElementById('readiness-score-val');
      const scoreBar = document.getElementById('readiness-score-bar');
      const recShields = document.getElementById('rec-shield-domains');
      const recMeetings = document.getElementById('rec-monthly-meetings');
      const recTier = document.getElementById('rec-retainer-tier');

      if (scoreDisplay) scoreDisplay.textContent = `${score} / 100`;
      if (scoreBar) scoreBar.style.width = `${score}%`;

      if (recShields) {
        recShields.textContent =
          rev === '250k_plus'
            ? '3 Dedicated Shield Domains (6 Google Workspace Mailboxes)'
            : '2 Dedicated Shield Domains (4 Google Workspace Mailboxes)';
      }
      if (recMeetings) {
        recMeetings.textContent =
          acv === '50k_plus'
            ? '12 – 18 Qualified Executive Appointments / Month'
            : '16 – 26 Qualified Decision-Maker Appointments / Month';
      }
      if (recTier) {
        recTier.textContent =
          rev === '250k_plus'
            ? '$3,500 – $4,000 AUD/mo (Enterprise Multi-Territory Scale)'
            : '$2,500 – $3,250 AUD/mo (Core Done-For-You Acquisition Engine)';
      }

      return score;
    }

    function showStep(stepNum) {
      currentStep = stepNum;
      stepPanels.forEach((panel) => {
        const pStep = Number(panel.getAttribute('data-audit-step-panel'));
        panel.classList.toggle('hidden', pStep !== currentStep);
      });
      stepIndicators.forEach((ind) => {
        const iStep = Number(ind.getAttribute('data-audit-step-indicator'));
        if (iStep < currentStep) {
          ind.className = 'flex items-center gap-2 text-xs font-mono-code text-emerald-400';
        } else if (iStep === currentStep) {
          ind.className = 'flex items-center gap-2 text-xs font-mono-code text-white font-bold';
        } else {
          ind.className = 'flex items-center gap-2 text-xs font-mono-code text-slate-500';
        }
      });
      calculateReadinessScore();
    }

    document.querySelectorAll('[data-next-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = Number(btn.getAttribute('data-next-step'));
        showStep(target);
      });
    });

    document.querySelectorAll('[data-prev-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = Number(btn.getAttribute('data-prev-step'));
        showStep(target);
      });
    });

    [fVertical, fTerritory, fRevenue, fDealValue, fBottleneck].forEach((el) => {
      if (el) el.addEventListener('change', calculateReadinessScore);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = fName?.value.trim() || '';
      const companyVal = fCompany?.value.trim() || '';
      const emailVal = fEmail?.value.trim() || '';
      const domainVal = fDomain?.value.trim() || '';

      if (!nameVal || !companyVal || !emailVal) {
        window.showBizeToast('Please complete required contact fields', 'Name, Company, and Work Email are required.');
        return;
      }

      const submitBtn = document.getElementById('audit-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="font-mono-code">ANALYSING DOMAIN DNS & COMPILING BRIEF...</span>`;
      }

      const finalScore = calculateReadinessScore();
      const submission = {
        id: 'BG-' + Math.floor(100000 + Math.random() * 900000),
        submittedAt: new Date().toLocaleString('en-AU'),
        name: nameVal,
        company: companyVal,
        domain: domainVal || 'Not specified',
        email: emailVal,
        phone: fPhone?.value.trim() || 'Not specified',
        vertical: fVertical?.options[fVertical.selectedIndex]?.text || '',
        territory: fTerritory?.options[fTerritory.selectedIndex]?.text || '',
        revenueBand: fRevenue?.options[fRevenue.selectedIndex]?.text || '',
        acvBand: fDealValue?.options[fDealValue.selectedIndex]?.text || '',
        bottleneck: fBottleneck?.options[fBottleneck.selectedIndex]?.text || '',
        notes: fNotes?.value.trim() || 'None',
        readinessScore: finalScore
      };

      try {
        const existingLeads = JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS) || '[]');
        existingLeads.unshift(submission);
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(existingLeads));
      } catch (err) {
        console.warn('Could not persist lead:', err);
      }

      const compiledBrief = [
        `BIZE GROWTH — 15-MINUTE PIPELINE ARCHITECTURE AUDIT BRIEF (${submission.id})`,
        `====================================================================`,
        `Applicant: ${submission.name} (${submission.company})`,
        `Primary Domain to Protect: ${submission.domain}`,
        `Work Email: ${submission.email} | Phone: ${submission.phone}`,
        `Target Vertical: ${submission.vertical}`,
        `Target Territory: ${submission.territory}`,
        `Current Monthly Revenue: ${submission.revenueBand}`,
        `Average Contract Value (ACV): ${submission.acvBand}`,
        `Primary Bottleneck: ${submission.bottleneck}`,
        `Calculated Pipeline Readiness Score: ${submission.readinessScore} / 100`,
        `Additional Context: ${submission.notes}`
      ].join('\n');

      setTimeout(() => {
        form.classList.add('hidden');
        const confirmPanel = document.getElementById('audit-confirmation-panel');
        const briefPre = document.getElementById('audit-compiled-brief');
        const mailtoLink = document.getElementById('audit-mailto-btn');
        const copyBriefBtn = document.getElementById('audit-copy-brief-btn');

        if (briefPre) briefPre.textContent = compiledBrief;
        if (mailtoLink) {
          const subject = encodeURIComponent(`Pipeline Architecture Audit Request — ${submission.company} (${submission.id})`);
          const body = encodeURIComponent(compiledBrief);
          mailtoLink.href = `mailto:brandon@bizestudios.com.au?subject=${subject}&body=${body}`;
        }
        if (copyBriefBtn) {
          copyBriefBtn.onclick = function () {
            if (navigator.clipboard) navigator.clipboard.writeText(compiledBrief);
            window.showBizeToast('Audit Scope Brief Copied', `Reference ID: ${submission.id}`);
          };
        }
        if (confirmPanel) confirmPanel.classList.remove('hidden');
        window.showBizeToast('Pipeline Audit Brief Generated', `Readiness Score: ${submission.readinessScore}/100`);
      }, 650);
    });

    calculateReadinessScore();
  }

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHomeTelemetryHUD();
    initHomeVerticalTabs();
    initHomeMiniCalculator();
    initSystemPage();
    initVerticalSimulator();
    initFullCalculator();
    initAuditFunnel();
  });
})();
