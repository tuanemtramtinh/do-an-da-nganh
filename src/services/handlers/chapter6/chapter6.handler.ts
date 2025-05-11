export class Chapter6Handler {
  constructor() {}

  public run() {
    // Chuong 6
    interface LubricantInfo {
      name: string
      application: string
      quantity: string
      replacementTime: string
    }

    const lubricationTable: LubricantInfo[] = [
      {
        name: 'Dầu ô tô máy kéo AK-15',
        application: 'Bộ truyền trong hộp',
        quantity: '0,6 lít/Kw',
        replacementTime: '5 tháng'
      },
      {
        name: 'Mỡ T',
        application: 'Tất cả các ổ và bộ truyền ngoài',
        quantity: '2/3 chỗ rỗng bộ phận ổ',
        replacementTime: '1 năm'
      }
    ]

    return lubricationTable
    // Het Chuong 6
  }
}
