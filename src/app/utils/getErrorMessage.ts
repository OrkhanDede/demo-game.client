interface IErrorMessage {
  key: string;
  title: string;
  reason: string;
}
export function getErrorMessage(response: any): Array<IErrorMessage> {
  let messages: Array<IErrorMessage> = [];
  if (!response) return [];
  var isError = response.isError;

  if (isError) {
    if (response.message) {
      messages.push({
        key: 'message',
        title: 'Error!',
        reason: response.message,
      });
    } else {
      var responseException = response.responseException;
      var isValidationError =
        responseException.validationErrors &&
        responseException.validationErrors.length > 0;

      if (isValidationError) {
        responseException.validationErrors.forEach((element: any) => {
          messages.push({
            key: element.name,
            title: 'Error!',
            reason: element.reason,
          });
        });
      } else {
        messages.push({
          key: 'exceptionMessage',
          title: 'Error!',
          reason: responseException.exceptionMessage,
        });
      }
    }
  }
  return messages;
}
