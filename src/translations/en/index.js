import { ACTIVITY_STATUS } from '@/constants/business';
import { ERROR_TYPES } from '@/constants/general';

const translations = {
  common: {
    back: 'Back',
    cancel: 'Cancel',
    change: 'Change',
    close: 'Close',
    collectibles: 'Collectibles',
    comingSoon: 'Coming Soon!',
    continue: 'Continue',
    deposit: 'Deposit',
    more: 'More',
    or: 'Or',
    pluggedInto: 'Plugged into {{name}}',
    send: 'Send',
    swap: 'Swap',
    swapFor: 'Swap {{from}} for {{to}}',
    tokens: 'Tokens',
    biometricSignIn: 'Sign in with biometrics?',
    copied: 'Copied!',
    copyClipboard: 'Copy to clipboard',
    revealPhrase: 'Reveal Seed Phrase',
    available: 'Available',
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
    title: 'Send',
    inputLabel: 'To:',
    inputPlaceholder: 'Name or address',
    enterAmount: 'Enter an Amount',
    noFunds: 'Insufficient Funds',
    reviewSend: 'Review Send',
    contact: 'Contact',
    enterPassword: 'Enter your password',
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
  nftTab: {
    emptyTitle: "You don't own any Collectibles yet",
    emptySubtitle:
      "When you do, they'll show here, where you will see their traits and send them.",
  },
  nftDetail: {
    collectionTitle: '🧩 Collection',
    descriptionTitle: '📝 Description',
    attributesTitle: '🎛 Attributes',
    moreTitle: 'More Options',
    moreOptions: {
      view: 'View',
      share: 'Share',
      download: 'Download',
    },
  },
  activity: {
    [ACTIVITY_STATUS.COMPLETED]: 'Completed',
    [ACTIVITY_STATUS.PENDING]: 'Pending',
    [ACTIVITY_STATUS.REVERTED]: 'Failed',
    title: 'Activity',
    subtitleTo: ' · To: {{value}}',
    subtitleFrom: ' · From: {{value}}',
    emptyTitle: 'You have no activity yet',
    emptySubtitle:
      "When you do, they'll show here, where you will see their traits and send them.",
  },
  settings: {
    title: 'Settings',
    items: {
      contacts: { name: 'Contacts', desc: 'Add, edit, remove contacts.' },
      phrase: { name: 'Seed Phrase', desc: 'View your seed phrase & backup.' },
      biometric: {
        name: 'Biometric Unlock',
        desc: 'Turn Biometrics on or off.',
      },
      lock: { name: 'Lock Account', desc: 'Lock your account and sign out.' },
    },
    version: 'v{{version}}',
    infoItems: {
      docs: '📕  Learn more about Plug',
      blog: '📰  Read our Blog',
      twitter: '🐦  Follow us on Twitter',
      discord: '👾  Join our Discord',
    },
  },
  accounts: {
    title: 'Accounts',
    createAccount: 'Create account',
    moreOptions: {
      edit: 'Edit Account',
      copy: 'Copy Address',
    },
    setEmoji: 'Set Emoji',
    editEmoji: 'Edit emoji',
    editButton: '👈 Edit',
    accountNamePlaceholder: 'Account name',
    save: 'Save Account',
    edit: 'Edit Account',
    create: 'Create Account',
  },
  contacts: {
    title: 'Contacts',
    addContact: 'Add contact',
    editContact: 'Edit contact',
    moreOptions: {
      edit: 'Edit Contact',
      copy: 'Copy Address',
      delete: 'Delete Contact',
    },
    namePlaceholder: 'Name',
    idPlaceholder: 'Principal ID',
    nameTaken: 'Name is already taken!',
    contactAlreadySaved: 'Contact already saved as {{name}}',
  },
  validations: {
    passRequired: 'Password is required.',
    passMinLength: 'Password must be at least 12 characters long.',
    passIncorrect: 'The password is incorrect',
    invalidChar: 'Invalid character.',
  },
  errors: {
    [ERROR_TYPES.FETCH_ERROR]: {
      emoji: '🤔',
      title: 'We had an issue',
      description:
        'We are unable to surface your account info due to an error.',
      buttonTitle: 'Refresh',
    },
    [ERROR_TYPES.CONNECTION_ERROR]: {
      emoji: '📡',
      title: 'Internet Connection Error',
      description:
        'We are unable to surface your account info due to an internet connection error.',
      buttonTitle: 'Retry Connection',
    },
    [ERROR_TYPES.ERROR_BOUNDARY]: {
      emoji: '😨',
      title: 'Oops, we had an issue!',
      description:
        'Close and reopen the app to try again. If the issue persists, contact our team on Discord.',
      buttonTitle: '  Join Discord',
      buttonImage: 'discord',
    },
  },
};

export default translations;
