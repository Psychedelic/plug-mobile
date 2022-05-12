const translations = {
  common: {
    back: 'Back',
    continue: 'Continue',
    or: 'Or',
    cancel: 'Cancel',
    close: 'Close',
    tokens: 'Tokens',
    collectibles: 'Collectibles',
  },
  welcome: {
    title: 'Welcome to Plug',
    initTitle: 'Choose an option',
    create: 'Create Wallet',
    createNew: 'Create New Wallet',
    import: 'Import Wallet',
    importNew: 'Import New Wallet',
  },
  login: {
    submit: 'Submit',
    unlock: 'Unlock Plug',
    signInBiometric: 'Sign in with biometrics',
    moreOptions: 'More options',
  },
  importSeedPhrase: {
    title: 'Import Wallet',
    enterPhrase: 'Please enter your 12 word Secret Recovery Phrase.',
    secretPhrase: 'Secret Recovery Phrase',
    notFound: 'Recovery phrase not found',
  },
  createPassword: {
    title: 'Create Password',
    subtitle: 'Please create a secure password that you will remember.',
    biometrics: 'Sign in with biometrics?',
  },
  backupSeed: {
    title: 'Seed Phrase Backup',
    subtitle: 'Below is the seed phrase for your new wallet, write it down.',
    confirm: "I've saved these words",
  },
  deposit: {
    title: 'Deposit',
    principalIdDesc:
      "Use when receiving from Plug accounts & users, or other apps that support sending directly to Principal ID's.",
    accountIdDesc:
      "Use when receiving from exchanges, or other apps that only support sending to Accounts ID's.",
  },
  send: {
    inputLabel: 'To:',
    inputPlaceholder: 'Name or address',
    enterAmount: 'Enter an Amount',
    noFunds: 'Insufficient Funds',
    reviewSend: 'Review Send',
    contact: 'Contact',
  },
  reviewSend: {
    to: 'To',
    saveContact: 'Save as contact',
    goToActivity: 'View in Activity',
    holdToSend: 'Hold to Send',
    holdToRetry: 'Hold to Retry',
    totalFee: 'Total Fee: {{value}}',
    transactionSuccess: 'Confirmed',
    transactionError: 'Transaction Failed',
    transactionPending: 'Review Send',
  },
  saveContact: {
    title: 'Save Contact',
    namePlaceholder: 'Name',
  },
  validations: {
    passRequired: 'Password is required.',
    passMinLength: 'Password must be at least 12 characters long.',
    invalidChar: 'Invalid character.',
  },
};

export default translations;
