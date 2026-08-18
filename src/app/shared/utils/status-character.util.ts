export function getCharacterStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'success';
    case 'dead':
      return 'danger';
    default:
      return 'medium';
  } 
}