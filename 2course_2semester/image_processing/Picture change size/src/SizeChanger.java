import java.awt.image.*;

class SizeChanger {
	public static BufferedImage resize(BufferedImage bmp, double quotient) {
		if (quotient == 1)
			return bmp;
		else if (quotient > 1)
			return enlarge(bmp, quotient);
		else
			return shrink(bmp, quotient);
	}
	
	private static BufferedImage shrink(BufferedImage bmp, double quotient) {
		int width = (int)(bmp.getWidth() * quotient);
		int height = (int)(bmp.getHeight() * quotient);
		BufferedImage result = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
		
		for (int i = 0; i < width; ++i)
			for (int j = 0; j < height; ++j) {
				int color = bmp.getRGB((int)(i / quotient), (int)(j / quotient));
				result.setRGB(i, j, color);
			}
		
		return result;
	}
	
	private static BufferedImage enlarge(BufferedImage bmp, double quotient) {
		int width = bmp.getWidth();
		int height = bmp.getHeight();
		
		int rWidth = (int)(width * quotient);
		int rHeight = (int)(height * quotient);
		BufferedImage result = new BufferedImage(rWidth, rHeight, BufferedImage.TYPE_INT_ARGB);
				
		for (int j = 0; j < height; ++j) {
			int y = (int)(j * quotient);
			
			for (int i = 0; i < width; ++i) {				
				int x = (int)(i * quotient);
				
				result.setRGB(x, y, bmp.getRGB(i, j));
				
				if (i == 0) continue;
				
				for (int x1 = (int)((i - 1)* quotient), k = x1 + 1; k < x; ++k) {
					int c1 = result.getRGB(x1,  y);
					int c2 = result.getRGB(x, y);
					result.setRGB(k, y, colorInterpolation(k, x1, c1, x, c2));
				}
			}
		}
		
		for (int j = 1; j < height; ++j) {
			int y = (int)(j * quotient);
			
			for (int i = 0; i < rWidth; ++i) {
				for (int y1 = (int)((j - 1) * quotient), k = y1 + 1; k < y; ++k) {
					int c1 = result.getRGB(i, y1);
					int c2 = result.getRGB(i, y);
					result.setRGB(i, k, c1);//colorInterpolation(k, y1, c1, y, c2));
				}
			}
		}
		
		return result;
	}
	
	private static int colorInterpolation(int x, int x1, int y1, int x2, int y2) {
		Color c1 = new Color(y1);
		Color c2 = new Color(y2);
		
		Color res = new Color(interpolation(x, x1, c1.A, x2, c2.A),
				interpolation(x, x1, c1.R, x2, c2.R),
				interpolation(x, x1, c1.G, x2, c2.G),
				interpolation(x, x1, c1.B, x2, c2.B));
		
		return res.argb;
	}
	
	private static int interpolation(int x, int x1, int y1, int x2, int y2) {
		return (int)((double)y2 * (x2 - x) / (x2 - x1)
				+ (double)y1 * (x - x1) / (x2 - x1));
	}
}

class Color {
	public final int A;
	public final int R;
	public final int G;
	public final int B;
	
	public final int argb;
	
	public Color(int argb) {
		A = argb >> 24 & 0xFF;
		R = argb >> 16 & 0xFF;
		G = argb >> 8 & 0xFF;
		B = argb & 0xFF;
		
		this.argb = argb;
	}
	
	public Color(int a, int r, int g, int b) {
		this.A = a;
		this.R = r;
		this.G = g;
		this.B = b;
		
		argb = (a << 24) + (r << 16) + (g << 8) + b;
	}
}