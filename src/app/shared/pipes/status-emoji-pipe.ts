import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusEmoji',
})
export class StatusEmojiPipe implements PipeTransform {
    transform(status: string): string {

    switch (status?.toLowerCase()) {

      case 'alive':
        return '🟢';

      case 'dead':
        return '🔴';

      case 'unknown':
        return '🟡';

      default:
        return '⚪';
    }
  }
}
