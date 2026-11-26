/** Reserved adapter. This build never sends mail, even when the env keys are filled later. */
export async function sendQuoteEmail(): Promise<{ sent: false; reason: "off" }> {
  return { sent: false, reason: "off" };
}
