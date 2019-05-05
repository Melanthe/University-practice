package photoPortal.dto;

public class Answer {

    private boolean status;
    private String name;

    public Answer(String name, boolean status) {
        setName(name);
        setStatus(status);
    }

    public Answer() {
        name = "no name";
        status = false;
    }

    @Override
    public String toString() {
        return ("Name of application: " + name +
                "\nStatus of server: " + status);
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = "".equals(name) ? "no name" : name;
    }
}
