package com.knight.core.util;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * Created by YaoFly on 2016/12/27.
 */
public class ZipUtil {
    //多文件压缩
    public static void zipFile(String fileName, ZipOutputStream out) throws IOException {
        File file = new File(fileName);
        if (file.exists()) {
            byte[] buffer = new byte[1024];
            FileInputStream fis = new FileInputStream(file);
            out.putNextEntry(new ZipEntry(file.getName()));
            out.setEncoding("GBK");
            int len = 0;
            //读入需要下载的文件的内容，打包到zip文件
            while ((len = fis.read(buffer)) > 0) {
                out.write(buffer, 0, len);
            }
            out.flush();
            out.closeEntry();
            fis.close();
        }
    }
}
