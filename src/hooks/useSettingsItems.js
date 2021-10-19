const useSettingsItems = () => {
  return [
    {
      icon: '📓',
      name: 'Contacts',
      description: 'Add, edit, remove contacts.',
      onPress: () => null,
    },
    {
      icon: '🗝',
      name: 'Seed Phrase',
      description: 'View your seed phrase & backup.',
      onPress: () => null,
    },
  ]
}

export default useSettingsItems;
