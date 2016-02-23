import java.awt.*;
import java.awt.image.*;
import java.io.*;
import java.util.Scanner;

import javax.imageio.ImageIO;

public class Program {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		String inputFileName;
		String outputFileName;
		double quotient;
		
		System.out.println("Enter an input file name:");
		inputFileName = in.nextLine();
		System.out.println("Enter an output file name:");
		outputFileName = in.nextLine();
		System.out.println("Enter a quotient of size changing:");
		quotient = in.nextDouble();
		
		File inputFile = new File(inputFileName);
		File outputFile = new File(outputFileName);
		try {
			BufferedImage inputImage = ImageIO.read(inputFile);
			BufferedImage outputImage = SizeChanger.resize(inputImage, quotient);
			
			ImageIO.write(outputImage, "png", outputFile);
			
			System.out.println("Done");
		} catch (IOException e) {
			System.out.println("Error: " + e.toString());
		}
	}

}
