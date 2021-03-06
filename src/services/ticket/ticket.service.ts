import { Ticket } from "../../../src/refs";

export class TicketService {
    static async getTicketInfo(ticketId: string) {
        return await Ticket.findById(ticketId)
            .populate({
                path: 'client',
                select: 'sid name email phone'
            })
            .populate({
                path: 'staffCustomerCase',
                select: 'name email phone'
            })
            .populate({
                path: 'dentistResponsible',
                select: 'sid name email phone'
            })
            .populate({
                path: 'branchRegister',
                select: 'name email phone'
            })
            .populate({
                path: 'items.service',
                select: 'name sid unit'
            })
            .populate({
                path: 'receiptVoucher',
                select: 'sid totalPayment'
            });
    }
}