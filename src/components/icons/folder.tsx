import folderIcon from '../../../public/images/icons/file.svg'
import Image from '../ui/image'

export default function Folder({ className }: PropsWithClassName) {
  return (
    <div className={className}>
      <Image src={folderIcon.src} alt={folderIcon.alt} width={30} height={30} />
    </div>
  )
}
