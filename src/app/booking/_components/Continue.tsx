import Link from "next/link";
import styles from "./Continue.module.css";

interface ContinueProps {
  price: number;
  link?: string;
  onNavigate?: (e: any) => void;
}

export default function Continue({ price, link = "", onNavigate }: ContinueProps) {
  return (
    <div className={styles.finalSection}>
      Total: ${price}
      <Link href={link} onNavigate={onNavigate}>
        <button className={styles.continueButton}>Continue</button>
      </Link>
    </div>
  );
}
