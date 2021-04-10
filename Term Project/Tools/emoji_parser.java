import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Scanner;
import java.io.FileWriter;

public class emoji_parser {
  public static void main(String[] args) {
    Scanner scanner = null;
    FileWriter writer = null;
    try {
      File file = new File("emoji-test.txt");
      scanner = new Scanner(file, "UTF-8");
      writer = new FileWriter("processed-emoji.txt");
      int counter = 0;
      while(scanner.hasNextLine()) {
        String line = scanner.nextLine();
        if(line.startsWith("#") || line.length() == 0)
          continue;
        String[] tokens = line.split("\\s+");
        if(tokens.length > 1 && tokens[1].equals(";")){
          System.out.println(line);
          writer.write(tokens[0] + "\n");
          counter++;
        }
      }
      scanner.close();
      writer.close();
      System.out.println("number of items: " + counter);
    }
    catch(IOException e) {
      System.out.println("error");
    }
  }
}
